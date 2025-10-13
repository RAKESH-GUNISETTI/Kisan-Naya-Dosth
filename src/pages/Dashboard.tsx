import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Cloud, Droplets, Sun, TrendingUp, Calendar, AlertCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Dashboard</h1>
          <p className="text-muted-foreground">Monitor your crops and farm activities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Acreage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25 Acres</div>
              <p className="text-xs text-muted-foreground">Wheat: 15 | Rice: 10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expected Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 Tons</div>
              <p className="text-xs text-success-foreground">+12% from last season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weather Today</CardTitle>
              <Sun className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28°C</div>
              <p className="text-xs text-muted-foreground">Sunny, No rain expected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
              <Droplets className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">Optimal level</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription>Scheduled activities for this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-2 w-2 rounded-full bg-primary" />
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
        </div>

        {/* Crop Calendar */}
        <Card>
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
                  <div className="h-full bg-primary rounded-full" style={{ width: "37.5%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Vegetative stage - Tillering</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Rice - Growth Stage</span>
                  <span className="text-xs text-muted-foreground">Day 30/140</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "21.4%" }} />
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
