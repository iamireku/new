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
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Info,
  Banknote,
  CheckCircle,
  PlusCircle,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const totalSteps = 4;

interface Criterion {
  id: number;
  text: string;
}

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [dealTitle, setDealTitle] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<Criterion[]>([
    { id: 1, text: 'Product delivered as described' },
    { id: 2, text: 'Service completed on time' },
  ]);
  const [newCriterion, setNewCriterion] = useState('');


  const router = useRouter();
  const { toast } = useToast();

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    toast({
      title: 'Deal Created!',
      description: 'Your new deal has been sent to the other party.',
    });
    router.push('/dashboard/transactions');
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setAcceptanceCriteria([
        ...acceptanceCriteria,
        { id: Date.now(), text: newCriterion.trim() },
      ]);
      setNewCriterion('');
    }
  };

  const handleRemoveCriterion = (idToRemove: number) => {
    setAcceptanceCriteria(acceptanceCriteria.filter((c) => c.id !== idToRemove));
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
                 <Label>Acceptance Criteria</Label>
                 <p className="text-xs text-muted-foreground">Define what needs to be done for the deal to be complete.</p>
                 <div className="space-y-2">
                    {acceptanceCriteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center gap-2">
                        <Checkbox id={`criterion-${criterion.id}`} disabled checked />
                        <Label htmlFor={`criterion-${criterion.id}`} className="flex-1 font-normal text-sm">{criterion.text}</Label>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveCriterion(criterion.id)}>
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                 </div>
                 <div className="flex gap-2 pt-2">
                    <Input 
                        placeholder="Add a new criterion..."
                        value={newCriterion}
                        onChange={(e) => setNewCriterion(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddCriterion(); }}}
                    />
                    <Button type="button" onClick={handleAddCriterion}>
                        <PlusCircle className="mr-2" />
                        Add
                    </Button>
                 </div>
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
