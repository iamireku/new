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
  Mail,
  Phone,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const totalSteps = 5;

interface Criterion {
  id: number;
  text: string;
}

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [dealTitle, setDealTitle] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<Criterion[]>([
    { id: 1, text: 'Product delivered as described' },
    { id: 2, text: 'Service completed on time' },
  ]);
  const [newCriterion, setNewCriterion] = useState('');

  const [partyEmail, setPartyEmail] = useState('');
  const [partyPhone, setPartyPhone] = useState('');
  const [dealAmount, setDealAmount] = useState('');


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
    router.push('/dashboard/deals');
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
        return <UserCheck className="h-6 w-6" />;
      case 2:
        return <Info className="h-6 w-6" />;
      case 3:
        return <Users className="h-6 w-6" />;
      case 4:
        return <Banknote className="h-6 w-6" />;
      case 5:
        return <FileText className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getPronoun = () => (role === 'buyer' ? 'Seller' : 'Buyer');

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <div className="flex items-center justify-center gap-4">
            {getStepIcon(step)}
            <div className="flex-1">
              <CardTitle className="font-headline">
                {step === 1 && 'Your Role'}
                {step === 2 && (role === 'buyer' ? "What are you buying?" : "What are you selling?")}
                {step === 3 && `The Other Person (${getPronoun()})`}
                {step === 4 && 'Amount and Terms'}
                {step === 5 && 'Review Your Deal'}
              </CardTitle>
              <CardDescription>
                {step === 1 && 'Are you the buyer or the seller in this deal?'}
                {step === 2 && 'Give your deal a clear title.'}
                {step === 3 && `Who are you making this deal with?`}
                {step === 4 && 'How much is the deal for?'}
                {step === 5 && 'Check the details below before creating the deal.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 1 && (
            <div className="flex items-center justify-center pt-8">
              <RadioGroup
                value={role || ''}
                onValueChange={(value: 'buyer' | 'seller') => setRole(value)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm"
              >
                <Label
                  htmlFor="buyer"
                  className={cn(
                    'flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                    role === 'buyer' && 'border-primary'
                  )}
                >
                  <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                  <span className="text-2xl mb-2">🛍️</span>
                  <span className="font-bold">I am the Buyer</span>
                  <span className="text-xs text-muted-foreground">I am paying for a product or service.</span>
                </Label>
                <Label
                  htmlFor="seller"
                  className={cn(
                    'flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                    role === 'seller' && 'border-primary'
                  )}
                >
                  <RadioGroupItem value="seller" id="seller" className="sr-only" />
                  <span className="text-2xl mb-2">📦</span>
                  <span className="font-bold">I am the Seller</span>
                  <span className="text-xs text-muted-foreground">I am providing a product or service.</span>
                </Label>
              </RadioGroup>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deal-title">Service or Product</Label>
                <Input
                  id="deal-title"
                  placeholder="e.g., iPhone 15 or Website Design"
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
                 <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Input 
                        placeholder="Add a new criterion..."
                        value={newCriterion}
                        onChange={(e) => setNewCriterion(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddCriterion(); }}}
                    />
                    <Button type="button" onClick={handleAddCriterion} className="sm:w-auto w-full">
                        <PlusCircle className="mr-2" />
                        Add
                    </Button>
                 </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="party-email">Other Person's Email</Label>
                <Input
                  id="party-email"
                  type="email"
                  placeholder="friend@example.com"
                  value={partyEmail}
                  onChange={(e) => setPartyEmail(e.target.value)}
                />
              </div>
               <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-muted" />
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t border-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="party-phone">Other Person's Phone Number</Label>
                <Input
                  id="party-phone"
                  type="tel"
                  placeholder="+233 12 345 6789"
                  value={partyPhone}
                  onChange={(e) => setPartyPhone(e.target.value)}
                />
              </div>
               <p className="text-xs text-muted-foreground pt-2">We will send an invitation to them to join the deal.</p>
            </form>
          )}
          {step === 4 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deal-amount">Deal Amount (GHS)</Label>
                <Input 
                  id="deal-amount" 
                  type="number" 
                  placeholder="5000" 
                  value={dealAmount}
                  onChange={(e) => setDealAmount(e.target.value)}
                />
              </div>
               <p className="text-xs text-muted-foreground pt-2">
                This amount will be held safely by us once the deal is accepted and funded. Ensure you have sufficient funds in your wallet.
              </p>
            </form>
          )}
          {step === 5 && (
            <div className="space-y-6">
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-semibold text-lg">{dealTitle || 'Untitled Deal'}</h3>
                    <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-base">GHS {parseFloat(dealAmount || '0').toLocaleString()}</span>
                        </div>
                         {(partyEmail || partyPhone) && <Separator />}
                        {partyEmail && <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{partyEmail}</span>
                        </div>}
                        {partyPhone && <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{partyPhone}</span>
                        </div>}
                         <Separator />
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            <span>You are the <span className="font-semibold capitalize">{role}</span></span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-medium">Acceptance Criteria</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {acceptanceCriteria.map(c => <li key={c.id}>{c.text}</li>)}
                        {acceptanceCriteria.length === 0 && <li>No criteria defined.</li>}
                    </ul>
                </div>
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
            <Button onClick={nextStep} disabled={step === 1 && !role}>
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
