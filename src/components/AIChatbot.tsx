import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, X, Mic, MicOff, Volume2, VolumeX, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatbot = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [chatHistoryId, setChatHistoryId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current i18n language
      const langMap: { [key: string]: string } = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'te': 'te-IN'
      };
      recognitionRef.current.lang = langMap[i18n.language] || 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice recognition error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [i18n.language, toast]);

  // Load chat history on mount
  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  // Save chat history when messages change
  useEffect(() => {
    if (user && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        saveChatHistory();
      }, 1000); // Debounce saves
      return () => clearTimeout(timeoutId);
    }
  }, [messages, user]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    try {
      // Get the most recent chat history (within 15 days)
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
      
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', fifteenDaysAgo.toISOString())
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading chat history:', error);
        return;
      }

      if (data && data.messages) {
        const savedMessages = data.messages as unknown as Message[];
        if (Array.isArray(savedMessages) && savedMessages.length > 0) {
          setMessages(savedMessages);
          setChatHistoryId(data.id);
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatHistory = async () => {
    if (!user || messages.length === 0) return;
    
    try {
      const messagesJson = messages as unknown as Json;
      
      if (chatHistoryId) {
        // Update existing chat history
        const { error } = await supabase
          .from('chat_history')
          .update({ messages: messagesJson })
          .eq('id', chatHistoryId);

        if (error) throw error;
      } else {
        // Create new chat history
        const { data, error } = await supabase
          .from('chat_history')
          .insert({
            user_id: user.id,
            messages: messagesJson
          })
          .select()
          .single();

        if (error) throw error;
        if (data) setChatHistoryId(data.id);
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const scrollToBottom = () => {
      if (scrollRef.current) {
        // Radix ScrollArea uses a viewport element
        const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
        if (viewport) {
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const startListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (!synthesisRef.current || !voiceEnabled) return;

    synthesisRef.current.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on current i18n language
    const langMap: { [key: string]: string } = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN'
    };
    utterance.lang = langMap[i18n.language] || 'en-IN';

    // Try to find a voice matching the language
    const voices = synthesisRef.current.getVoices();
    let preferredVoice = voices.find(voice => 
      voice.lang.startsWith(i18n.language)
    );
    
    // For Telugu, try to find a Telugu-specific voice
    if (i18n.language === 'te' && !preferredVoice) {
      preferredVoice = voices.find(voice => 
        voice.lang.includes('te') || voice.name.toLowerCase().includes('telugu')
      );
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set speech rate and pitch for better Telugu pronunciation
    if (i18n.language === 'te') {
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentInput = input;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages, // Send previous messages for context
        }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let textBuffer = '';

      // Add empty assistant message to the updated messages
      setMessages([...updatedMessages, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                // Ensure we're updating the last message (assistant response)
                const newMessages = [...prev];
                if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage
                  };
                } else {
                  newMessages.push({
                    role: 'assistant',
                    content: assistantMessage
                  });
                }
                return newMessages;
              });
            }
          } catch (e) {
            // Partial JSON, buffer it
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Speak the response if voice is enabled
      if (assistantMessage && voiceEnabled) {
        speakText(assistantMessage);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive",
      });
      // Remove the empty assistant message and restore user message if needed
      setMessages(prev => {
        const filtered = prev.filter((msg, idx) => {
          // Keep all messages except empty assistant messages at the end
          return !(idx === prev.length - 1 && msg.role === 'assistant' && !msg.content);
        });
        return filtered;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow animate-pulse-soft z-50"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-medium animate-slide-in-right z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-accent" />
              {t('chatbot.title')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isSpeaking) {
                    stopSpeaking();
                  } else {
                    setVoiceEnabled(!voiceEnabled);
                  }
                }}
                className="h-8 w-8"
                title={isSpeaking ? t('chatbot.stopSpeaking') : (voiceEnabled ? 'Disable voice' : 'Enable voice')}
              >
                {isSpeaking ? (
                  <VolumeX className="h-4 w-4 text-destructive" />
                ) : voiceEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
            <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
              <div className="space-y-4 py-4 px-4">
                {messages.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    <p className="mb-2">{t('chatbot.welcomeMessage')}</p>
                    <p className="text-xs">{t('chatbot.welcomeSubtext')}</p>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 break-words ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-accent" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chatbot.placeholder')}
                    disabled={isLoading || isListening}
                    className="pr-10"
                  />
                  {isListening && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else {
                      startListening();
                    }
                  }}
                  disabled={isLoading}
                  title={t('chatbot.clickToSpeak')}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isListening}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {isListening && (
                <p className="text-xs text-muted-foreground mt-2 text-center animate-pulse">
                  {t('chatbot.listening')}
                </p>
              )}
              {isSpeaking && (
                <p className="text-xs text-muted-foreground mt-2 text-center animate-pulse">
                  {t('chatbot.speaking')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
