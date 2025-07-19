'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Info,
  Banknote,
  CheckCircle,
  Sparkles,
  Loader2,
  Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateDealDescription } from '@/ai/flows/generate-deal-description';

const totalSteps = 4;

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [dealTitle, setDealTitle] = useState('');
  const [dealDescription, setDealDescription] = useState('');
  const [dealImage, setDealImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDealImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!dealTitle) {
      toast({
        variant: 'destructive',
        title: 'Title is missing',
        description: 'Please enter a deal title before generating a description.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateDealDescription({
        dealTitle,
        imageDataUri: dealImage,
      });
      setDealDescription(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Description',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinish = () => {
    toast({
      title: 'Deal Created!',
      description: 'Your new deal has been sent to the other party.',
    });
    router.push('/dashboard/transactions');
  };

  const getStepIcon = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <Info className="h-6 w-6" />;
      case 2:
        return <Users className="h-6 w-6" />;
      case 3:
        return <Banknote className="h-6 w-6" />;
      case 4:
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <div className="flex items-center justify-center gap-4">
            {getStepIcon(step)}
            <div className="flex-1">
              <CardTitle className="font-headline">
                {step === 1 && 'Deal Details'}
                {step === 2 && 'The Other Person'}
                {step === 3 && 'Amount and Terms'}
                {step === 4 && 'Deal Ready!'}
              </CardTitle>
              <CardDescription>
                {step === 1 && "What's this deal about?"}
                {step === 2 && 'Who are you making this deal with?'}
                {step === 3 && 'How much is the deal for?'}
                {step === 4 && 'Review and create the deal.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deal-title">Deal Title</Label>
                <Input
                  id="deal-title"
                  placeholder="e.g., Website Design Project"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deal-image">Product Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input id="deal-image" type="file" onChange={handleFileChange} accept="image/*" className="flex-1" />
                  {dealImage && (
                    <img src={dealImage} alt="Product preview" className="h-16 w-16 rounded-md object-cover" />
                  )}
                </div>
              </div>

              <div className="relative space-y-2">
                 <div className="flex justify-between items-center">
                    <Label htmlFor="deal-description">Description</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Auto-write with AI
                    </Button>
                 </div>
                <Textarea
                  id="deal-description"
                  placeholder="Describe the agreement, deliverables, and terms. Or, let AI write it for you!"
                  rows={5}
                  value={dealDescription}
                  onChange={(e) => setDealDescription(e.target.value)}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="party-email">Other Person's Email</Label>
                <Input
                  id="party-email"
                  type="email"
                  placeholder="friend@example.com"
                />
              </div>
               <p className="text-xs text-muted-foreground">We will send an invitation to them to join the deal.</p>
            </form>
          )}
          {step === 3 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deal-amount">Deal Amount (GHS)</Label>
                <Input id="deal-amount" type="number" placeholder="5000" />
              </div>
            </form>
          )}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-2xl font-bold">You are all set!</h2>
              <p className="text-muted-foreground max-w-md">
                A deal invitation will be sent. The money will be held safely by us once funded.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          ) : <div />}
          
          {step < totalSteps && (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}

          {step === totalSteps && (
            <Button className="w-full" onClick={handleFinish}>
              <CheckCircle className="mr-2" />
              Create & Send Deal
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
