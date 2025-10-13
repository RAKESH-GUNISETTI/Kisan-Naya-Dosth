import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sprout, Brain, TrendingUp, Users, ChevronRight, Check } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ open, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: Sprout,
      title: "Welcome to Farmer Friend",
      description: "Your AI-powered companion for smarter farming decisions",
      content: "Plan crops, diagnose pests, and maximize your profits with intelligent insights in your own language."
    },
    {
      icon: Brain,
      title: "AI Crop Doctor",
      description: "Instant pest & disease identification",
      content: "Simply take a photo of your crop, and our AI will diagnose issues and provide treatment options with cost estimates."
    },
    {
      icon: TrendingUp,
      title: "Smart Planning",
      description: "Data-driven crop management",
      content: "Get real-time yield projections, profit calculations, and weather alerts to make informed decisions."
    },
    {
      icon: Users,
      title: "Collaborate & Share",
      description: "Work together, grow together",
      content: "Share farm plans with family, generate reports for loans, and learn from the farming community."
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit animate-bounce-in">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-center">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 animate-fade-in">
          <p className="text-sm text-muted-foreground text-center">
            {currentStep.content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === step ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="gap-2">
            {step === steps.length - 1 ? (
              <>
                Get Started
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
