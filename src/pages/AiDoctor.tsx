import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Camera, Upload, Scan, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import aiDoctorIcon from "@/assets/ai-doctor-icon.png";

const AiDoctor = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzePlant();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePlant = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: "Brown Rust (Puccinia triticina)",
        severity: "Moderate",
        confidence: 87,
        treatment: [
          {
            type: "Organic",
            method: "Apply neem oil solution (5ml/L water)",
            cost: "₹200-300 per acre",
            time: "3-4 days",
            effectiveness: "65%"
          },
          {
            type: "Standard",
            method: "Spray Propiconazole fungicide",
            cost: "₹600-800 per acre",
            time: "1-2 days",
            effectiveness: "90%"
          },
          {
            type: "Aggressive",
            method: "Combination spray + remove infected plants",
            cost: "₹1200-1500 per acre",
            time: "1 day",
            effectiveness: "95%"
          }
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "AI diagnosis ready with treatment recommendations",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <img src={aiDoctorIcon} alt="AI Doctor" className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-foreground">AI Crop Doctor</h1>
          </div>
          <p className="text-muted-foreground">Upload a photo for instant pest and disease diagnosis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Upload Plant Image
              </CardTitle>
              <CardDescription>Take a clear photo of the affected plant part</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button asChild>
                        <span>Choose Image</span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded plant"
                        className="w-full h-auto"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <div className="text-center">
                            <Scan className="h-12 w-12 text-primary animate-pulse mx-auto mb-2" />
                            <p className="text-sm font-medium">Analyzing image...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedImage(null);
                        setDiagnosis(null);
                      }}
                      className="w-full"
                    >
                      Upload Different Image
                    </Button>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Info className="h-4 w-4 text-accent" />
                    Tips for Best Results
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                    <li>• Take photo in good natural light</li>
                    <li>• Focus on the affected area clearly</li>
                    <li>• Include multiple leaves if possible</li>
                    <li>• Avoid blurry or dark images</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis Section */}
          <div className="space-y-6">
            {diagnosis ? (
              <>
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Diagnosis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-lg font-bold text-foreground">{diagnosis.disease}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Severity: <span className="font-medium text-destructive">{diagnosis.severity}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Confidence: <span className="font-medium text-foreground">{diagnosis.confidence}%</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      Treatment Action Plan
                    </CardTitle>
                    <CardDescription>Choose the best approach for your situation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {diagnosis.treatment.map((treatment: any, index: number) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:border-primary transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{treatment.type} Treatment</h4>
                          <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                            {treatment.effectiveness} effective
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{treatment.method}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Cost:</span>{" "}
                            <span className="font-medium">{treatment.cost}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>{" "}
                            <span className="font-medium">{treatment.time}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          View Detailed Steps
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Upload a plant image to get AI-powered diagnosis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiDoctor;
