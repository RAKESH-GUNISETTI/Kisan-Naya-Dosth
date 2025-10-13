import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Target, Award, TrendingUp } from "lucide-react";

const UsageStats = () => {
  const stats = [
    {
      icon: Activity,
      label: "Crop Plans Created",
      value: 12,
      trend: "+3 this week",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Target,
      label: "AI Diagnoses",
      value: 28,
      trend: "+8 this week",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Award,
      label: "Reports Generated",
      value: 15,
      trend: "+2 this week",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: TrendingUp,
      label: "Yield Improvement",
      value: "18%",
      trend: "vs last season",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <Badge variant="secondary" className="mt-2 text-xs">
                {stat.trend}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UsageStats;
