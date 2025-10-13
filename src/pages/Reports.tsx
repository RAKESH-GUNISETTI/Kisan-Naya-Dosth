import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { FileText, Download, Share2, Calendar, TrendingUp, Sprout, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("comprehensive");

  const handleExport = (format: string) => {
    toast({
      title: "Report Generated!",
      description: `Your ${reportType} report has been exported as ${format.toUpperCase()}`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Report Shared!",
      description: "Report link sent via WhatsApp",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Reports</h1>
          <p className="text-muted-foreground">Generate comprehensive reports for loans, schemes, or sharing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Report Configuration
                </CardTitle>
                <CardDescription>Select report type and customize content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["comprehensive", "financial", "crop-health"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setReportType(type)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          reportType === type
                            ? "border-primary bg-primary/5 scale-105"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium capitalize">{type.replace("-", " ")}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-date">From Date</Label>
                    <Input type="date" id="from-date" defaultValue="2024-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date">To Date</Label>
                    <Input type="date" id="to-date" defaultValue="2024-12-31" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Preview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>Preview of your farm report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-card space-y-6">
                  <div className="text-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-foreground">Farm Activity Report</h2>
                    <p className="text-sm text-muted-foreground">January 2024 - December 2024</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Acreage</p>
                      <p className="text-xl font-bold text-foreground">25 Acres</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Crops Grown</p>
                      <p className="text-xl font-bold text-foreground">3 Types</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Yield</p>
                      <p className="text-xl font-bold text-success">45 Tons</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Net Profit</p>
                      <p className="text-xl font-bold text-success">₹3,50,000</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <h3 className="font-semibold text-foreground">Crop Details</h3>
                    <div className="space-y-2">
                      {[
                        { crop: "Wheat", area: "15 acres", yield: "27 tons", revenue: "₹2,10,000" },
                        { crop: "Rice", area: "10 acres", yield: "18 tons", revenue: "₹1,40,000" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 rounded bg-muted/50">
                          <span className="font-medium">{item.crop}</span>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{item.area}</span>
                            <span>{item.yield}</span>
                            <span className="text-success">{item.revenue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions & Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => handleExport("pdf")} className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
                <Button onClick={() => handleExport("excel")} variant="outline" className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
                <Button onClick={handleShare} variant="outline" className="w-full" size="lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Report Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reports Generated</span>
                  <span className="text-xl font-bold text-foreground">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Shared Reports</span>
                  <span className="text-xl font-bold text-foreground">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Generated</span>
                  <span className="text-sm font-medium text-foreground">2 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-success shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-success-foreground mx-auto animate-float" />
                  <h3 className="font-bold text-success-foreground">Pro Tip</h3>
                  <p className="text-sm text-success-foreground/90">
                    Share reports with banks for faster loan approvals!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
