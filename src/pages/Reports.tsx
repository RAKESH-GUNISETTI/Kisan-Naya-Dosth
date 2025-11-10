import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { FileText, Download, Share2, Calendar, TrendingUp, Sprout, DollarSign, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface ReportData {
  totalAcreage: number;
  cropsGrown: number;
  totalYield: number;
  netProfit: number;
  cropDetails: Array<{
    crop: string;
    area: string;
    yield: string;
    revenue: string;
  }>;
}

const Reports = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [reportType, setReportType] = useState("comprehensive");
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-12-31");
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadReportData();
  }, [user, fromDate, toDate]);

  const loadReportData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch user profile for farming details
      const { data: profile } = await supabase
        .from('profiles')
        .select('farming_details')
        .eq('id', user.id)
        .single();

      const farmingDetails = profile?.farming_details as any;
      const landArea = parseFloat(farmingDetails?.landArea || "25");
      
      // Generate sample report data (in production, fetch from actual data)
      const data: ReportData = {
        totalAcreage: landArea || 25,
        cropsGrown: 3,
        totalYield: Math.round(landArea * 1.8),
        netProfit: Math.round(landArea * 14000),
        cropDetails: [
          { crop: "Wheat", area: `${Math.round(landArea * 0.6)} acres`, yield: `${Math.round(landArea * 1.08)} tons`, revenue: `₹${Math.round(landArea * 14000)}` },
          { crop: "Rice", area: `${Math.round(landArea * 0.4)} acres`, yield: `${Math.round(landArea * 0.72)} tons`, revenue: `₹${Math.round(landArea * 5600)}` },
        ]
      };
      
      setReportData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load report data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    if (!reportData) return;
    
    setGenerating(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPos = 20;

      // Title
      doc.setFontSize(20);
      doc.text("Farm Activity Report", pageWidth / 2, yPos, { align: "center" });
      yPos += 10;

      // Date range
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`${fromDate} - ${toDate}`, pageWidth / 2, yPos, { align: "center" });
      yPos += 15;

      // Report Type
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, 20, yPos);
      yPos += 10;

      // Stats
      doc.setFontSize(12);
      doc.text(`Total Acreage: ${reportData.totalAcreage} Acres`, 20, yPos);
      yPos += 7;
      doc.text(`Crops Grown: ${reportData.cropsGrown} Types`, 20, yPos);
      yPos += 7;
      doc.text(`Total Yield: ${reportData.totalYield} Tons`, 20, yPos);
      yPos += 7;
      doc.text(`Net Profit: ₹${reportData.netProfit.toLocaleString()}`, 20, yPos);
      yPos += 15;

      // Crop Details
      doc.setFontSize(14);
      doc.text("Crop Details", 20, yPos);
      yPos += 10;

      doc.setFontSize(10);
      reportData.cropDetails.forEach((crop, idx) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`${idx + 1}. ${crop.crop}`, 25, yPos);
        doc.text(`   Area: ${crop.area} | Yield: ${crop.yield} | Revenue: ${crop.revenue}`, 25, yPos + 5);
        yPos += 12;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" });

      doc.save(`Farm_Report_${reportType}_${fromDate}_${toDate}.pdf`);
      
      toast({
        title: "Report Generated!",
        description: "PDF report downloaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateExcel = () => {
    if (!reportData) return;
    
    setGenerating(true);
    try {
      const workbook = XLSX.utils.book_new();

      // Summary Sheet
      const summaryData = [
        ["Farm Activity Report"],
        [`Period: ${fromDate} to ${toDate}`],
        [`Report Type: ${reportType}`],
        [],
        ["Metric", "Value"],
        ["Total Acreage", `${reportData.totalAcreage} Acres`],
        ["Crops Grown", `${reportData.cropsGrown} Types`],
        ["Total Yield", `${reportData.totalYield} Tons`],
        ["Net Profit", `₹${reportData.netProfit.toLocaleString()}`],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

      // Crop Details Sheet
      const cropData = [
        ["Crop", "Area", "Yield", "Revenue"],
        ...reportData.cropDetails.map(crop => [crop.crop, crop.area, crop.yield, crop.revenue])
      ];
      const cropSheet = XLSX.utils.aoa_to_sheet(cropData);
      XLSX.utils.book_append_sheet(workbook, cropSheet, "Crop Details");

      XLSX.writeFile(workbook, `Farm_Report_${reportType}_${fromDate}_${toDate}.xlsx`);
      
      toast({
        title: "Report Generated!",
        description: "Excel report downloaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate Excel",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = (format: string) => {
    if (format === "pdf") {
      generatePDF();
    } else if (format === "excel") {
      generateExcel();
    }
  };

  const handleShare = () => {
    const message = `Check out my farm report for ${fromDate} to ${toDate}!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Report Shared!",
      description: "Opening WhatsApp to share report",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

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
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.01]">
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
                        className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                          reportType === type
                            ? "border-primary bg-primary/5 scale-105 shadow-md"
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
                    <Input 
                      type="date" 
                      id="from-date" 
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="transition-all hover:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date">To Date</Label>
                    <Input 
                      type="date" 
                      id="to-date" 
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="transition-all hover:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Preview */}
            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>Preview of your farm report</CardDescription>
              </CardHeader>
              <CardContent>
                {reportData ? (
                  <div className="border rounded-lg p-6 bg-card space-y-6 animate-fade-in">
                    <div className="text-center border-b pb-4">
                      <h2 className="text-2xl font-bold text-foreground">Farm Activity Report</h2>
                      <p className="text-sm text-muted-foreground">{fromDate} - {toDate}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Acreage</p>
                        <p className="text-xl font-bold text-foreground">{reportData.totalAcreage} Acres</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Crops Grown</p>
                        <p className="text-xl font-bold text-foreground">{reportData.cropsGrown} Types</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Yield</p>
                        <p className="text-xl font-bold text-success">{reportData.totalYield} Tons</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Net Profit</p>
                        <p className="text-xl font-bold text-success">₹{reportData.netProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <h3 className="font-semibold text-foreground">Crop Details</h3>
                      <div className="space-y-2">
                        {reportData.cropDetails.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 rounded bg-muted/50 hover:bg-muted transition-colors">
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
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions & Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleExport("pdf")} 
                  className="w-full" 
                  size="lg"
                  disabled={generating || !reportData}
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export as PDF
                </Button>
                <Button 
                  onClick={() => handleExport("excel")} 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  disabled={generating || !reportData}
                >
                  {generating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export as Excel
                </Button>
                <Button 
                  onClick={handleShare} 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
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

            <Card className="bg-gradient-success shadow-soft hover:shadow-medium transition-all duration-300">
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
