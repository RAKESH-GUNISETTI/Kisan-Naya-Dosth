import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("I want to check the weather forecast for my wheat field");
        toast({
          title: "Voice Command Received",
          description: "Processing your request...",
        });
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <Card className="shadow-soft">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Button
              size="lg"
              onClick={toggleListening}
              className={`rounded-full h-20 w-20 transition-all duration-300 ${
                isListening 
                  ? "bg-destructive hover:bg-destructive/90 animate-pulse shadow-glow" 
                  : "bg-gradient-accent shadow-medium hover:scale-110"
              }`}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping opacity-75" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground">Voice Assistant</h3>
            <p className="text-sm text-muted-foreground">
              {isListening ? "Listening..." : "Tap to speak"}
            </p>
          </div>

          {transcript && (
            <div className="bg-muted/50 rounded-lg p-3 animate-slide-up">
              <div className="flex items-start gap-2">
                <Volume2 className="h-4 w-4 text-accent mt-0.5" />
                <p className="text-sm text-foreground text-left">{transcript}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {["Weather", "Crop Plan", "Pest Check", "Market Price"].map((cmd) => (
              <Button
                key={cmd}
                size="sm"
                variant="outline"
                className="text-xs hover:scale-105 transition-transform"
              >
                {cmd}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;
