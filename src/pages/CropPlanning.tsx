import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import { Sprout, Calculator, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CropPlanning = () => {
  const { toast } = useToast();
  const [cropType, setCropType] = useState("wheat");
  const [acreage, setAcreage] = useState(10);
  const [seedRate, setSeedRate] = useState([75]);
  const [irrigationLevel, setIrrigationLevel] = useState([60]);

  const cropData = {
    wheat: { yieldPerAcre: 1.8, pricePerTon: 25000, costPerAcre: 15000 },
    rice: { yieldPerAcre: 2.5, pricePerTon: 22000, costPerAcre: 18000 },
    cotton: { yieldPerAcre: 1.2, pricePerTon: 55000, costPerAcre: 20000 },
    sugarcane: { yieldPerAcre: 35, pricePerTon: 3500, costPerAcre: 25000 },
  };

  const calculateProjections = () => {
    const data = cropData[cropType as keyof typeof cropData];
    const totalYield = data.yieldPerAcre * acreage * (seedRate[0] / 100) * (irrigationLevel[0] / 100);
    const totalCost = data.costPerAcre * acreage;
    const totalRevenue = totalYield * data.pricePerTon;
    const netProfit = totalRevenue - totalCost;

    return {
      totalYield: totalYield.toFixed(2),
      totalCost: totalCost.toLocaleString(),
      totalRevenue: totalRevenue.toLocaleString(),
      netProfit: netProfit.toLocaleString(),
      profitPerAcre: (netProfit / acreage).toLocaleString(),
    };
  };

  const projections = calculateProjections();

  const handleSavePlan = () => {
    toast({
      title: "Crop Plan Saved!",
      description: "Your crop plan has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Crop Planning</h1>
          <p className="text-muted-foreground">Plan your crop inputs and view yield projections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  Crop Configuration
                </CardTitle>
                <CardDescription>Configure your crop parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acreage">Total Acreage</Label>
                  <Input
                    id="acreage"
                    type="number"
                    value={acreage}
                    onChange={(e) => setAcreage(Number(e.target.value))}
                    min="1"
                    max="1000"
                  />
                  <p className="text-xs text-muted-foreground">Enter total area in acres</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Seed Rate: {seedRate[0]}%</Label>
                    <span className="text-sm text-muted-foreground">of recommended rate</span>
                  </div>
                  <Slider
                    value={seedRate}
                    onValueChange={setSeedRate}
                    min={50}
                    max={150}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjust seed density based on your strategy
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Irrigation Level: {irrigationLevel[0]}%</Label>
                    <span className="text-sm text-muted-foreground">of optimal level</span>
                  </div>
                  <Slider
                    value={irrigationLevel}
                    onValueChange={setIrrigationLevel}
                    min={30}
                    max={100}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjust based on water availability
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSavePlan} className="flex-1">
                    <Calculator className="h-4 w-4 mr-2" />
                    Save Plan
                  </Button>
                  <Button variant="outline">View Scenarios</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projections Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Yield Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {projections.totalYield} tons
                </div>
                <p className="text-sm text-muted-foreground">Expected total yield</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-xl font-semibold text-foreground">₹{projections.totalCost}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Revenue</p>
                  <p className="text-xl font-semibold text-foreground">₹{projections.totalRevenue}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-success">₹{projections.netProfit}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{projections.profitPerAcre} per acre
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sowing to Harvest:</span>
                    <span className="font-medium">120 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Irrigation:</span>
                    <span className="font-medium">Day 15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fertilizer Apply:</span>
                    <span className="font-medium">Day 30, 60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harvest Window:</span>
                    <span className="font-medium">Mar 15-25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropPlanning;
