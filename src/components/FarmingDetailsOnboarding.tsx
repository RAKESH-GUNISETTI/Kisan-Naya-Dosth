import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, MapPin, Sprout, TrendingUp } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface FarmingDetails {
  state: string;
  district: string;
  village: string;
  landArea: string;
  soilType: string;
  primaryCrops: string;
  farmingExperience: string;
  irrigationType: string;
  farmSize: string;
  annualIncome: string;
  familyMembers: string;
}

const FarmingDetailsOnboarding = ({ open, onComplete }: { open: boolean; onComplete: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<FarmingDetails>({
    state: '',
    district: '',
    village: '',
    landArea: '',
    soilType: '',
    primaryCrops: '',
    farmingExperience: '',
    irrigationType: '',
    farmSize: '',
    annualIncome: '',
    familyMembers: ''
  });

  const updateDetail = (key: keyof FarmingDetails, value: string) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          farming_details: details as unknown as Json
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile completed!",
        description: "Your farming details have been saved.",
      });
      
      onComplete();
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save farming details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onComplete();
    navigate('/dashboard');
  };

  const stepIcons = [MapPin, Sprout, TrendingUp];
  const StepIcon = stepIcons[step];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <StepIcon className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">{t('onboarding.title')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('onboarding.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Step 1: Location & Land */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold mb-4">{t('onboarding.step1')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">{t('profile.state')}</Label>
                  <Input
                    id="state"
                    value={details.state}
                    onChange={(e) => updateDetail('state', e.target.value)}
                    placeholder="e.g., Punjab"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">{t('profile.district')}</Label>
                  <Input
                    id="district"
                    value={details.district}
                    onChange={(e) => updateDetail('district', e.target.value)}
                    placeholder="e.g., Jalandhar"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="village">{t('profile.village')}</Label>
                  <Input
                    id="village"
                    value={details.village}
                    onChange={(e) => updateDetail('village', e.target.value)}
                    placeholder="Enter your village name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landArea">{t('profile.landArea')}</Label>
                  <Input
                    id="landArea"
                    type="number"
                    value={details.landArea}
                    onChange={(e) => updateDetail('landArea', e.target.value)}
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmSize">{t('profile.farmSize')}</Label>
                  <Select value={details.farmSize} onValueChange={(value) => updateDetail('farmSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-5 acres)</SelectItem>
                      <SelectItem value="medium">Medium (5-25 acres)</SelectItem>
                      <SelectItem value="large">Large (25+ acres)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Crops & Soil */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold mb-4">{t('onboarding.step2')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType">{t('profile.soilType')}</Label>
                  <Select value={details.soilType} onValueChange={(value) => updateDetail('soilType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="clay-loam">Clay-Loam</SelectItem>
                      <SelectItem value="sandy-loam">Sandy-Loam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigationType">{t('profile.irrigationType')}</Label>
                  <Select value={details.irrigationType} onValueChange={(value) => updateDetail('irrigationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rainfed">Rainfed</SelectItem>
                      <SelectItem value="borewell">Borewell</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="primaryCrops">{t('profile.primaryCrops')}</Label>
                  <Input
                    id="primaryCrops"
                    value={details.primaryCrops}
                    onChange={(e) => updateDetail('primaryCrops', e.target.value)}
                    placeholder="e.g., Wheat, Rice, Cotton (comma separated)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience & Resources */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold mb-4">{t('onboarding.step3')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">{t('profile.farmingExperience')}</Label>
                  <Input
                    id="farmingExperience"
                    type="number"
                    value={details.farmingExperience}
                    onChange={(e) => updateDetail('farmingExperience', e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyMembers">{t('profile.familyMembers')}</Label>
                  <Input
                    id="familyMembers"
                    type="number"
                    value={details.familyMembers}
                    onChange={(e) => updateDetail('familyMembers', e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="annualIncome">{t('profile.annualIncome')}</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={details.annualIncome}
                    onChange={(e) => updateDetail('annualIncome', e.target.value)}
                    placeholder="e.g., 500000"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-1">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === step ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={handlePrevious} disabled={loading}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t('onboarding.previous')}
              </Button>
            )}
            <Button variant="ghost" onClick={handleSkip} disabled={loading}>
              {t('onboarding.skip')}
            </Button>
            <Button onClick={handleNext} disabled={loading}>
              {step === 2 ? (
                <>
                  {t('onboarding.complete')}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  {t('onboarding.next')}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FarmingDetailsOnboarding;

