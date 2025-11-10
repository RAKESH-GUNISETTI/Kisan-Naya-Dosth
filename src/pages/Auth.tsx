import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmingDetailsOnboarding from '@/components/FarmingDetailsOnboarding';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, signIn, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showFarmingOnboarding, setShowFarmingOnboarding] = useState(false);
  const [newlySignedUp, setNewlySignedUp] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', fullName: '' });
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(loginData.email, loginData.password);
      navigate('/dashboard');
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUp(signupData.email, signupData.password, signupData.fullName);
      // If user is immediately signed in (email confirmation disabled)
      if (result?.user) {
        setNewlySignedUp(true);
        // Wait for auth state to update
        setTimeout(() => {
          setShowFarmingOnboarding(true);
        }, 1000);
      } else {
        // Email confirmation required
        toast({
          title: "Check your email",
          description: "Please confirm your email address to continue.",
        });
      }
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user just signed up and needs onboarding
    if (user && newlySignedUp && !showFarmingOnboarding) {
      // Check if farming details already exist
      const checkFarmingDetails = async () => {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data } = await supabase
          .from('profiles')
          .select('farming_details')
          .eq('id', user.id)
          .single();
        
        if (!data?.farming_details) {
          setShowFarmingOnboarding(true);
        } else {
          navigate('/dashboard');
          setNewlySignedUp(false);
        }
      };
      checkFarmingDetails();
    }
  }, [user, newlySignedUp, showFarmingOnboarding, navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(resetEmail);
      setShowReset(false);
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (showReset) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader>
            <CardTitle>{t('auth.resetPassword')}</CardTitle>
            <CardDescription>Enter your email to receive a reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t('auth.email')}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {t('auth.sendResetLink')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowReset(false)}
              >
                {t('auth.backToLogin')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showFarmingOnboarding) {
    return (
      <FarmingDetailsOnboarding 
        open={showFarmingOnboarding} 
        onComplete={() => {
          setShowFarmingOnboarding(false);
          setNewlySignedUp(false);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="absolute top-4 left-4"
      >
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
      <Card className="w-full max-w-md animate-bounce-in shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Farmer Friend</CardTitle>
          <CardDescription className="text-center">
            {t('hero.title')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t('auth.email')}</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value.trim() })}
                    placeholder={t('auth.email')}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">{t('auth.password')}</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder={t('auth.password')}
                    required
                    autoComplete="current-password"
                    minLength={6}
                  />
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-xs"
                  onClick={() => setShowReset(true)}
                >
                  {t('auth.forgotPassword')}
                </Button>
                <Button type="submit" className="w-full" disabled={loading}>
                  {t('auth.login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t('auth.fullName')}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value.trim() })}
                    placeholder={t('auth.fullName')}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('auth.email')}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value.trim().toLowerCase() })}
                    placeholder={t('auth.email')}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('auth.password')}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    placeholder={t('auth.password')}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('auth.passwordHint')}
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {t('auth.signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
