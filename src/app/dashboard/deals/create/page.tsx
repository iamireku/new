// /src/app/dashboard/deals/create/page.tsx
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
  UploadCloud,
  ImageIcon,
  AtSign,
  Sparkles,
  CalendarIcon,
  Clock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { createDeal } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, formatISO, setHours, setMinutes } from 'date-fns';

const totalSteps = 5;

interface Criterion {
  id: number;
  text: string;
}

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [dealTitle, setDealTitle] = useState('');
  const [dealImage, setDealImage] = useState<string | null>(null);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<Criterion[]>([]);
  const [newCriterion, setNewCriterion] = useState('');

  const [partyId, setPartyId] = useState('');
  const [partyEmail, setPartyEmail] = useState('');
  const [partyPhone, setPartyPhone] = useState('');
  const [dealAmount, setDealAmount] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(new Date());


  const router = useRouter();
  const { toast } = useToast();

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    if (!role) return;

    createDeal({
        title: dealTitle || 'Untitled Deal',
        party: partyId || partyEmail || partyPhone || 'Unknown Party',
        amount: parseFloat(dealAmount || '0'),
        role: role,
        imageUrl: dealImage || undefined,
        deadline: deadline ? formatISO(deadline) : formatISO(new Date()),
        acceptanceCriteria: acceptanceCriteria.map(c => ({...c, completed: false})),
    });

    toast({
      title: 'Invitation Sent!',
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
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDealImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSmartStart = () => {
     toast({
        title: 'Coming Soon!',
        description: 'The AI assistant is not yet connected. This is a placeholder for now.',
     });
  }

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
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const newDeadline = setMinutes(setHours(date, deadline?.getHours() ?? 0), deadline?.getMinutes() ?? 0);
    setDeadline(newDeadline);
  };
  
  const handleTimeChange = (type: 'hours' | 'minutes', value: number) => {
    if (!deadline) return;
    let newDeadline;
    if (type === 'hours') {
        newDeadline = setHours(deadline, value);
    } else {
        newDeadline = setMinutes(deadline, value);
    }
    setDeadline(newDeadline);
  }

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
           <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    {getStepIcon(step)}
                    <div className="flex-1">
                        <CardTitle>
                            {step === 1 && 'Your Role'}
                            {step === 2 && (role === 'buyer' ? "What are you buying?" : "What are you selling?")}
                            {step === 3 && `The Other Person (${getPronoun()})`}
                            {step === 4 && 'Amount and Terms'}
                            {step === 5 && 'Review Your Deal'}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 && 'Are you the buyer or the seller in this deal?'}
                            {step === 2 && 'Give your deal a clear title and define the terms.'}
                            {step === 3 && `Who are you making this deal with?`}
                            {step === 4 && 'How much is the deal for and when is it due?'}
                            {step === 5 && 'Check the details below before creating the deal.'}
                        </CardDescription>
                    </div>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline"><Sparkles className="mr-2"/> Smart Start</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2"><Sparkles /> Smart Start</DialogTitle>
                            <DialogDescription>
                                Describe your deal in plain English. Our AI will fill out the form for you.
                            </DialogDescription>
                        </DialogHeader>
                        <Textarea 
                            placeholder="e.g., I'm selling a custom logo design for StartupX for GHS 1500 to Clara at clara@example.com. The final files should be in PNG and SVG format."
                            rows={5}
                        />
                        <CardFooter>
                            <Button className="w-full" onClick={handleSmartStart}>Generate Deal</Button>
                        </CardFooter>
                    </DialogContent>
                </Dialog>
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
                  <Label>Deal Image (Optional)</Label>
                  {dealImage ? (
                    <div className="relative group">
                       <Image src={dealImage} alt="Deal preview" width={200} height={200} className="rounded-md object-cover w-full h-48" />
                       <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => setDealImage(null)}>
                           <X className="h-4 w-4" />
                       </Button>
                    </div>
                  ) : (
                    <Label htmlFor="deal-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <Input id="deal-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </Label>
                  )}
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
                <Label htmlFor="party-phone">Other Person's Phone Number</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="party-phone"
                      type="tel"
                      placeholder="+233 12 345 6789"
                      className="pl-9"
                      value={partyPhone}
                      onChange={(e) => setPartyPhone(e.target.value)}
                    />
                </div>
              </div>
               <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-muted" />
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t border-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="party-email">Other Person's Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="party-email"
                      type="email"
                      placeholder="friend@example.com"
                      className="pl-9"
                      value={partyEmail}
                      onChange={(e) => setPartyEmail(e.target.value)}
                    />
                </div>
              </div>
               <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-muted" />
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t border-muted" />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="party-id">Other Person's Betweena ID</Label>
                  <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                          id="party-id"
                          placeholder="e.g. acme-inc"
                          className="pl-9"
                          value={partyId}
                          onChange={(e) => setPartyId(e.target.value)}
                      />
                  </div>
              </div>
               <p className="text-xs text-muted-foreground pt-2">If the person is not on Betweena, we will send an invitation to them to join the deal.</p>
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
               <div className="space-y-2">
                  <Label htmlFor="deal-deadline">Deal Deadline</Label>
                   <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !deadline && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {deadline ? format(deadline, "PPP 'at' h:mm a") : <span>Pick a date and time</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={deadline}
                                onSelect={handleDateSelect}
                                initialFocus
                            />
                            <div className="p-3 border-t border-border">
                                <Label className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4"/> Time</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        aria-label="Hour"
                                        className="w-16"
                                        min={0}
                                        max={23}
                                        value={deadline?.getHours() ?? ""}
                                        onChange={(e) => handleTimeChange('hours', parseInt(e.target.value, 10))}
                                    />
                                    <span>:</span>
                                    <Input
                                        type="number"
                                        aria-label="Minute"
                                        className="w-16"
                                        min={0}
                                        max={59}
                                        value={deadline?.getMinutes().toString().padStart(2, '0') ?? ""}
                                        onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value, 10))}
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
              </div>
               <p className="text-xs text-muted-foreground pt-2">
                The amount will be held safely by us. The deadline is when the work should be completed.
              </p>
            </form>
          )}
          {step === 5 && (
            <div className="space-y-6">
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-semibold text-lg">{dealTitle || 'Untitled Deal'}</h3>
                    {dealImage && (
                        <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-muted-foreground"/>
                            <span>Image has been attached</span>
                        </div>
                    )}
                    <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-base">GHS {parseFloat(dealAmount || '0').toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Due by {deadline ? format(deadline, "PPP 'at' h:mm a") : 'N/A'}</span>
                        </div>
                         {(partyId || partyEmail || partyPhone) && <Separator />}
                        {partyId && <div className="flex items-center gap-2">
                            <AtSign className="h-4 w-4 text-muted-foreground" />
                            <span>@{partyId}</span>
                        </div>}
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
            <Button onClick={nextStep} disabled={(step === 1 && !role) || (step === 4 && !dealAmount)}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}

          {step === totalSteps && (
            <Button className="w-full" onClick={handleFinish}>
              <CheckCircle className="mr-2" />
              Create & Send Invitation
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
