import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Save, X, MapPin, Sprout, TrendingUp } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface FarmingDetails {
  state?: string;
  district?: string;
  village?: string;
  landArea?: string;
  soilType?: string;
  primaryCrops?: string;
  farmingExperience?: string;
  irrigationType?: string;
  farmSize?: string;
  annualIncome?: string;
  familyMembers?: string;
}

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [farmingDetails, setFarmingDetails] = useState<FarmingDetails>({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFullName(data?.full_name || '');
      setEmail(data?.email || user.email || '');
      setFarmingDetails((data?.farming_details as FarmingDetails) || {});
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          farming_details: farmingDetails as unknown as Json
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t('profile.updateSuccess'),
        description: "Your profile has been updated.",
      });

      setEditing(false);
      loadProfile();
    } catch (error: any) {
      toast({
        title: t('profile.updateError'),
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFarmingDetail = (key: keyof FarmingDetails, value: string) => {
    setFarmingDetails(prev => ({ ...prev, [key]: value }));
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-muted-foreground">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
            {!editing ? (
              <Button onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {t('profile.edit')}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setEditing(false);
                  loadProfile();
                }}>
                  <X className="h-4 w-4 mr-2" />
                  {t('profile.cancel')}
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {t('profile.save')}
                </Button>
              </div>
            )}
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('profile.personalInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('auth.fullName')}</Label>
                  {editing ? (
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">{fullName || 'Not set'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>{t('auth.email')}</Label>
                  <p className="text-sm text-muted-foreground py-2">{email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farming Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                {t('profile.farmingDetails')}
              </CardTitle>
              <CardDescription>
                {t('profile.farmingDetails')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location & Land */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t('profile.location')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('profile.state')}</Label>
                    {editing ? (
                      <Input
                        value={farmingDetails.state || ''}
                        onChange={(e) => updateFarmingDetail('state', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.state || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.district')}</Label>
                    {editing ? (
                      <Input
                        value={farmingDetails.district || ''}
                        onChange={(e) => updateFarmingDetail('district', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.district || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.village')}</Label>
                    {editing ? (
                      <Input
                        value={farmingDetails.village || ''}
                        onChange={(e) => updateFarmingDetail('village', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.village || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.landArea')}</Label>
                    {editing ? (
                      <Input
                        type="number"
                        value={farmingDetails.landArea || ''}
                        onChange={(e) => updateFarmingDetail('landArea', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.landArea ? `${farmingDetails.landArea} acres` : 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Crops & Soil */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  Crops & Soil
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('profile.soilType')}</Label>
                    {editing ? (
                      <Select value={farmingDetails.soilType || ''} onValueChange={(value) => updateFarmingDetail('soilType', value)}>
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
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.soilType || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.irrigationType')}</Label>
                    {editing ? (
                      <Select value={farmingDetails.irrigationType || ''} onValueChange={(value) => updateFarmingDetail('irrigationType', value)}>
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
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.irrigationType || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>{t('profile.primaryCrops')}</Label>
                    {editing ? (
                      <Input
                        value={farmingDetails.primaryCrops || ''}
                        onChange={(e) => updateFarmingDetail('primaryCrops', e.target.value)}
                        placeholder="e.g., Wheat, Rice, Cotton"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.primaryCrops || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience & Resources */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Experience & Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('profile.farmingExperience')}</Label>
                    {editing ? (
                      <Input
                        type="number"
                        value={farmingDetails.farmingExperience || ''}
                        onChange={(e) => updateFarmingDetail('farmingExperience', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.farmingExperience ? `${farmingDetails.farmingExperience} years` : 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.familyMembers')}</Label>
                    {editing ? (
                      <Input
                        type="number"
                        value={farmingDetails.familyMembers || ''}
                        onChange={(e) => updateFarmingDetail('familyMembers', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.familyMembers || 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.annualIncome')}</Label>
                    {editing ? (
                      <Input
                        type="number"
                        value={farmingDetails.annualIncome || ''}
                        onChange={(e) => updateFarmingDetail('annualIncome', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.annualIncome ? `₹${parseInt(farmingDetails.annualIncome).toLocaleString()}` : 'Not set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{t('profile.farmSize')}</Label>
                    {editing ? (
                      <Select value={farmingDetails.farmSize || ''} onValueChange={(value) => updateFarmingDetail('farmSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (1-5 acres)</SelectItem>
                          <SelectItem value="medium">Medium (5-25 acres)</SelectItem>
                          <SelectItem value="large">Large (25+ acres)</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">{farmingDetails.farmSize || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;

