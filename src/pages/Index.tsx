import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Brain, TrendingUp, Cloud, Users, Leaf, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import aiDoctorIcon from "@/assets/ai-doctor-icon.png";
import cropPlanningIcon from "@/assets/crop-planning-icon.png";
import weatherIcon from "@/assets/weather-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <img src={cropPlanningIcon} alt="Crop Planning" className="h-16 w-16 mb-4" />
              <CardTitle className="flex items-center gap-2">
                Strategic Crop Planning
              </CardTitle>
              <CardDescription>
                Interactive planning with real-time cost and yield projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Voice & slider interface for easy input</li>
                <li>• Real-time profitability calculations</li>
                <li>• Scenario planning & what-if analysis</li>
                <li>• Budget optimization tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <img src={aiDoctorIcon} alt="AI Doctor" className="h-16 w-16 mb-4" />
              <CardTitle className="flex items-center gap-2">
                AI Crop Doctor
              </CardTitle>
              <CardDescription>
                Instant pest and disease diagnosis from photos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Computer vision pest identification</li>
                <li>• Treatment action plans with costs</li>
                <li>• Organic & chemical remedy options</li>
                <li>• Yield impact predictions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <img src={weatherIcon} alt="Weather" className="h-16 w-16 mb-4" />
              <CardTitle className="flex items-center gap-2">
                Smart Weather Alerts
              </CardTitle>
              <CardDescription>
                Proactive forecasts that update your crop plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hyper-local weather forecasts</li>
                <li>• Advance anomaly warnings</li>
                <li>• Irrigation window recommendations</li>
                <li>• Dynamic plan adjustments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <TrendingUp className="h-16 w-16 mb-4 text-success" />
              <CardTitle>Yield & Profit Tracking</CardTitle>
              <CardDescription>
                Monitor your farm's performance in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time profit per acre calculations</li>
                <li>• Market price integration</li>
                <li>• Growth stage monitoring</li>
                <li>• Historical comparisons</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <Users className="h-16 w-16 mb-4 text-accent" />
              <CardTitle>Family Collaboration</CardTitle>
              <CardDescription>
                Share farm plans and assign tasks easily
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-user farm profiles</li>
                <li>• Role-based permissions</li>
                <li>• Shared task management</li>
                <li>• WhatsApp report sharing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <BarChart3 className="h-16 w-16 mb-4 text-secondary" />
              <CardTitle>Community Intelligence</CardTitle>
              <CardDescription>
                Crowdsourced pest alerts and local insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Live pest outbreak map</li>
                <li>• Anonymous community reporting</li>
                <li>• Local market trends</li>
                <li>• Best practice sharing</li>
              </ul>
            </CardContent>
          </Card>
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
