import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import UsageStats from "@/components/UsageStats";
import VoiceInterface from "@/components/VoiceInterface";
import { Cloud, Droplets, Sun, TrendingUp, Calendar, AlertCircle, MapPin, DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Farm Dashboard</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <p>Jalandhar, Punjab • Today: Wed, Dec 18, 2024</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Season Profit</p>
                <p className="text-2xl font-bold text-success">₹4.2L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="mb-8">
          <UsageStats />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: TrendingUp, title: "Total Acreage", value: "25 Acres", desc: "Wheat: 15 | Rice: 10", color: "text-muted-foreground", delay: 0 },
            { icon: TrendingUp, title: "Expected Yield", value: "45 Tons", desc: "+12% from last season", color: "text-success", delay: 100 },
            { icon: Sun, title: "Weather Today", value: "28°C", desc: "Sunny, No rain expected", color: "text-accent", delay: 200 },
            { icon: Droplets, title: "Soil Moisture", value: "65%", desc: "Optimal level", color: "text-accent", delay: 300 }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={idx} 
                className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts, Tasks & Voice */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
                Active Alerts
              </CardTitle>
              <CardDescription>Important notifications for your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Pest Alert - Wheat Field</p>
                  <p className="text-xs text-muted-foreground">Brown rust detected in sector 3. Immediate action recommended.</p>
                  <Button size="sm" variant="outline" className="mt-2">View Details</Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <Cloud className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Heavy Rain Expected</p>
                  <p className="text-xs text-muted-foreground">Rain forecasted in 3 days. Plan irrigation accordingly.</p>
                  <Button size="sm" variant="outline" className="mt-2">View Forecast</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription>Scheduled activities for this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary transition-all duration-300 hover:scale-102 cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Fertilizer Application</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 6:00 AM - Wheat Field</p>
                </div>
                <Button size="sm" variant="ghost">Mark Done</Button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Irrigation Cycle</p>
                  <p className="text-xs text-muted-foreground">In 2 days - Rice Field</p>
                </div>
                <Button size="sm" variant="ghost">Mark Done</Button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-2 w-2 rounded-full bg-success" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Crop Inspection</p>
                  <p className="text-xs text-muted-foreground">In 4 days - All Fields</p>
                </div>
                <Button size="sm" variant="ghost">Mark Done</Button>
              </div>
            </CardContent>
          </Card>

          {/* Voice Interface */}
          <div className="animate-slide-in-right" style={{ animationDelay: "400ms" }}>
            <VoiceInterface />
            
            {/* Market Prices */}
            <Card className="mt-6 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  Today's Market Prices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { crop: "Wheat", price: "₹2,100/quintal", change: "+2.5%", up: true },
                  { crop: "Rice", price: "₹3,200/quintal", change: "-1.2%", up: false },
                  { crop: "Cotton", price: "₹6,500/quintal", change: "+4.8%", up: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                    <span className="font-medium text-sm">{item.crop}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold">{item.price}</p>
                      <p className={`text-xs ${item.up ? "text-success" : "text-destructive"}`}>
                        {item.change}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Crop Calendar */}
        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardHeader>
            <CardTitle>Crop Growth Calendar</CardTitle>
            <CardDescription>Track your crop development stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Wheat - Growth Stage</span>
                  <span className="text-xs text-muted-foreground">Day 45/120</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: "37.5%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Vegetative stage - Tillering</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Rice - Growth Stage</span>
                  <span className="text-xs text-muted-foreground">Day 30/140</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full transition-all duration-1000 ease-out" style={{ width: "21.4%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Early vegetative - Active tillering</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
