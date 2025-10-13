import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import OnboardingModal from "@/components/OnboardingModal";
import { Link } from "react-router-dom";
import { Brain, TrendingUp, Cloud, Users, Leaf, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import aiDoctorIcon from "@/assets/ai-doctor-icon.png";
import cropPlanningIcon from "@/assets/crop-planning-icon.png";
import weatherIcon from "@/assets/weather-icon.png";

const Index = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Your AI-Powered Personal Farm & Crop Management Companion
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Make smarter farming decisions with end-to-end crop guidance, real-time insights, and proactive alerts—all in your own language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/dashboard">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20">
                <Link to="/crop-planning">Try Crop Planning</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From planning to harvest, we've got you covered with AI-powered insights and actionable recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: cropPlanningIcon,
              title: "Strategic Crop Planning",
              desc: "Interactive planning with real-time cost and yield projections",
              features: [
                "Voice & slider interface for easy input",
                "Real-time profitability calculations",
                "Scenario planning & what-if analysis",
                "Budget optimization tools"
              ],
              delay: 0
            },
            {
              icon: aiDoctorIcon,
              title: "AI Crop Doctor",
              desc: "Instant pest and disease diagnosis from photos",
              features: [
                "Computer vision pest identification",
                "Treatment action plans with costs",
                "Organic & chemical remedy options",
                "Yield impact predictions"
              ],
              delay: 100
            },
            {
              icon: weatherIcon,
              title: "Smart Weather Alerts",
              desc: "Proactive forecasts that update your crop plan",
              features: [
                "Hyper-local weather forecasts",
                "Advance anomaly warnings",
                "Irrigation window recommendations",
                "Dynamic plan adjustments"
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
                <img src={feature.icon} alt={feature.title} className="h-16 w-16 mb-4 animate-float" />
                <CardTitle className="flex items-center gap-2">
                  {feature.title}
                </CardTitle>
                <CardDescription>
                  {feature.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {feature.features.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          {[
            {
              Icon: TrendingUp,
              title: "Yield & Profit Tracking",
              desc: "Monitor your farm's performance in real-time",
              features: [
                "Real-time profit per acre calculations",
                "Market price integration",
                "Growth stage monitoring",
                "Historical comparisons"
              ],
              color: "text-success",
              delay: 300
            },
            {
              Icon: Users,
              title: "Family Collaboration",
              desc: "Share farm plans and assign tasks easily",
              features: [
                "Multi-user farm profiles",
                "Role-based permissions",
                "Shared task management",
                "WhatsApp report sharing"
              ],
              color: "text-accent",
              delay: 400
            },
            {
              Icon: BarChart3,
              title: "Community Intelligence",
              desc: "Crowdsourced pest alerts and local insights",
              features: [
                "Live pest outbreak map",
                "Anonymous community reporting",
                "Local market trends",
                "Best practice sharing"
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
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {feature.features.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are making smarter, data-driven decisions every day
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/dashboard">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Farmer Friend. Empowering farmers with AI technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
