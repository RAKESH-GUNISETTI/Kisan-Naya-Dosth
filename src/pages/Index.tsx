import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import OnboardingModal from "@/components/OnboardingModal";
import { Link } from "react-router-dom";
import { TrendingUp, Users, BarChart3, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import aiDoctorIcon from "@/assets/ai-doctor-icon.png";
import cropPlanningIcon from "@/assets/crop-planning-icon.png";
import weatherIcon from "@/assets/weather-icon.png";

const Index = () => {
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding for first-time visitors
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <OnboardingModal open={showOnboarding} onClose={() => setShowOnboarding(false)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg hover:scale-105 transition-transform">
                <Link to="/dashboard">{t('hero.getStarted')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20 hover:scale-105 transition-transform">
                <Link to="/crop-planning">{t('hero.tryCropPlanning')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: cropPlanningIcon,
              titleKey: 'features.cropPlanning.title',
              descKey: 'features.cropPlanning.desc',
              featureKeys: [
                'features.cropPlanning.feature1',
                'features.cropPlanning.feature2',
                'features.cropPlanning.feature3',
                'features.cropPlanning.feature4'
              ],
              delay: 0
            },
            {
              icon: aiDoctorIcon,
              titleKey: 'features.aiDoctor.title',
              descKey: 'features.aiDoctor.desc',
              featureKeys: [
                'features.aiDoctor.feature1',
                'features.aiDoctor.feature2',
                'features.aiDoctor.feature3',
                'features.aiDoctor.feature4'
              ],
              delay: 100
            },
            {
              icon: weatherIcon,
              titleKey: 'features.weather.title',
              descKey: 'features.weather.desc',
              featureKeys: [
                'features.weather.feature1',
                'features.weather.feature2',
                'features.weather.feature3',
                'features.weather.feature4'
              ],
              delay: 200
            }
          ].map((feature, idx) => (
            <Card 
              key={idx}
              className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 animate-bounce-in"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <CardHeader>
                <img src={feature.icon} alt={t(feature.titleKey)} className="h-16 w-16 mb-4 animate-float" />
                <CardTitle className="flex items-center gap-2">
                  {t(feature.titleKey)}
                </CardTitle>
                <CardDescription>
                  {t(feature.descKey)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {feature.featureKeys.map((key, i) => (
                    <li key={i}>{t(key)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          {[
            {
              Icon: TrendingUp,
              titleKey: 'features.tracking.title',
              descKey: 'features.tracking.desc',
              featureKeys: [
                'features.tracking.feature1',
                'features.tracking.feature2',
                'features.tracking.feature3',
                'features.tracking.feature4'
              ],
              color: "text-success",
              delay: 300
            },
            {
              Icon: Users,
              titleKey: 'features.collaboration.title',
              descKey: 'features.collaboration.desc',
              featureKeys: [
                'features.collaboration.feature1',
                'features.collaboration.feature2',
                'features.collaboration.feature3',
                'features.collaboration.feature4'
              ],
              color: "text-accent",
              delay: 400
            },
            {
              Icon: BarChart3,
              titleKey: 'features.community.title',
              descKey: 'features.community.desc',
              featureKeys: [
                'features.community.feature1',
                'features.community.feature2',
                'features.community.feature3',
                'features.community.feature4'
              ],
              color: "text-secondary",
              delay: 500
            }
          ].map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <Card 
                key={idx}
                className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 animate-bounce-in"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <CardHeader>
                  <Icon className={`h-16 w-16 mb-4 ${feature.color} animate-float`} />
                  <CardTitle>{t(feature.titleKey)}</CardTitle>
                  <CardDescription>
                    {t(feature.descKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {feature.featureKeys.map((key, i) => (
                      <li key={i}>{t(key)}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 animate-fade-in">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            {t('cta.subtitle')}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-medium">
              <Link to="/dashboard">{t('cta.startTrial')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Farmer Friend</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.dashboard')}</Link></li>
                <li><Link to="/crop-planning" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.cropPlanning')}</Link></li>
                <li><Link to="/ai-doctor" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.aiDoctor')}</Link></li>
                <li><Link to="/reports" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.reports')}</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@farmerfriend.com" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.email')}: support@farmerfriend.com</a></li>
                <li><a href="tel:+911234567890" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.phone')}: +91 123 456 7890</a></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.helpCenter')}</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.faq')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('footer.address')}</li>
                <li>New Delhi, India</li>
                <li>PIN: 110001</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Farmer Friend. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
