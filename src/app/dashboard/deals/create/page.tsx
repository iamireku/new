// /src/app/dashboard/deals/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  AtSign,
  Sparkles,
  CalendarIcon,
  Clock,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { createDeal } from '@/lib/services/deals.service';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, formatISO, setHours, setMinutes } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const totalSteps = 5;

const dealSchema = z.object({
    role: z.enum(['buyer', 'seller'], { required_error: "You must select a role." }),
    title: z.string().min(3, "Title must be at least 3 characters."),
    images: z.array(z.string()).max(3).optional(),
    acceptanceCriteria: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
    partyId: z.string().optional(),
    partyEmail: z.string().email("Please enter a valid email.").optional(),
    partyPhone: z.string().optional(),
    amount: z.preprocess(
        (a) => parseFloat(z.string().parse(a)),
        z.number().positive("Amount must be a positive number.")
    ),
    deadline: z.date().optional(),
    location: z.string().optional(),
}).refine(data => data.partyId || data.partyEmail || data.partyPhone, {
    message: "You must provide at least one contact method for the other party.",
    path: ["partyPhone"], // Assign error to one field
});

type DealFormData = z.infer<typeof dealSchema>;


export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [newCriterion, setNewCriterion] = useState('');
  
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
        role: 'seller',
        title: '',
        images: [],
        acceptanceCriteria: [],
        partyId: '',
        partyEmail: '',
        partyPhone: '',
        amount: 0,
        deadline: new Date(),
        location: '',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "acceptanceCriteria"
  });
  
  const watchedRole = form.watch('role');

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleFinish = async (data: DealFormData) => {
    await createDeal({
        title: data.title || 'Untitled Deal',
        party: data.partyId || data.partyEmail || data.partyPhone || 'Unknown Party',
        amount: data.amount,
        role: data.role,
        imageUrls: data.images || [],
        deadline: data.deadline ? formatISO(data.deadline) : formatISO(new Date()),
        acceptanceCriteria: (data.acceptanceCriteria || []).map(c => ({...c, id: Date.now() + Math.random()})),
        location: data.location || undefined,
    });

    toast({
      title: 'Invitation Sent!',
      description: 'Your new deal has been sent to the other party.',
    });
    router.push('/dashboard/deals');
  };
  
  const handleAddCriterion = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (newCriterion.trim()) {
        append({ id: Date.now().toString(), text: newCriterion.trim() });
        setNewCriterion('');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const currentImages = form.getValues('images') || [];
    if (files) {
      const remainingSlots = 3 - currentImages.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const currentImages = form.getValues('images') || [];
            form.setValue('images', [...currentImages, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = form.getValues('images') || [];
    form.setValue('images', currentImages.filter((_, index) => index !== indexToRemove));
  };
  
  const handleSmartStart = () => {
     toast({
        title: 'Coming Soon!',
        description: 'The AI assistant is not yet connected. This is a placeholder for now.',
     });
  }

  const getStepIcon = (currentStep: number) => {
    switch (currentStep) {
      case 1: return <UserCheck className="h-6 w-6" />;
      case 2: return <Info className="h-6 w-6" />;
      case 3: return <Users className="h-6 w-6" />;
      case 4: return <Banknote className="h-6 w-6" />;
      case 5: return <FileText className="h-6 w-6" />;
      default: return null;
    }
  };

  const getPronoun = () => (watchedRole === 'buyer' ? 'Seller' : 'Buyer');
  
  const handleDateSelect = (date: Date | undefined, field: any) => {
    if (!date) return;
    const currentDeadline = form.getValues('deadline') || new Date();
    const newDeadline = setMinutes(setHours(date, currentDeadline.getHours()), currentDeadline.getMinutes());
    field.onChange(newDeadline);
  };
  
  const handleTimeChange = (type: 'hours' | 'minutes', value: number, field: any) => {
    const currentDeadline = form.getValues('deadline') || new Date();
    let newDeadline;
    if (type === 'hours') {
        newDeadline = setHours(currentDeadline, value);
    } else {
        newDeadline = setMinutes(currentDeadline, value);
    }
    field.onChange(newDeadline);
  }

  const triggerValidation = async () => {
    if (step === 2) return await form.trigger(["title"]);
    if (step === 3) return await form.trigger(["partyEmail", "partyId", "partyPhone"]);
    if (step === 4) return await form.trigger(["amount", "deadline"]);
    return true;
  };
  
  const handleNext = async () => {
    const isValid = await triggerValidation();
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="flex w-full justify-center">
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className='w-full max-w-2xl'>
      <Card>
        <CardHeader>
          <Progress value={progress} className="mb-4" />
           <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    {getStepIcon(step)}
                    <div className="flex-1">
                        <CardTitle>
                            {step === 1 && 'Your Role'}
                            {step === 2 && (watchedRole === 'buyer' ? "What are you buying?" : "What are you selling?")}
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
                        <Button type="button" variant="outline"><Sparkles className="mr-2"/> Smart Start</Button>
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
                            <Button type="button" className="w-full" onClick={handleSmartStart}>Generate Deal</Button>
                        </CardFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 1 && (
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-center pt-8">
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm"
                        >
                            <FormItem>
                                <FormControl>
                                <Label
                                htmlFor="buyer"
                                className={cn(
                                    'flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                                    field.value === 'buyer' && 'border-primary'
                                )}
                                >
                                <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                                <span className="text-2xl mb-2">🛍️</span>
                                <span className="font-bold">I am the Buyer</span>
                                <span className="text-xs text-muted-foreground">I am paying for a product or service.</span>
                                </Label>
                                </FormControl>
                            </FormItem>
                             <FormItem>
                                <FormControl>
                                <Label
                                htmlFor="seller"
                                className={cn(
                                    'flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                                    field.value === 'seller' && 'border-primary'
                                )}
                                >
                                <RadioGroupItem value="seller" id="seller" className="sr-only" />
                                <span className="text-2xl mb-2">📦</span>
                                <span className="font-bold">I am the Seller</span>
                                <span className="text-xs text-muted-foreground">I am providing a product or service.</span>
                                </Label>
                                </FormControl>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                    </FormItem>
                )}
            />
          )}
          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service or Product</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., iPhone 15 or Website Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Images (Up to 3)</FormLabel>
                     <FormControl>
                        <div className="grid grid-cols-3 gap-2">
                        {(field.value || []).map((image, index) => (
                          <div key={index} className="relative group aspect-square">
                            <Image src={image} alt={`Deal preview ${index + 1}`} fill className="rounded-md object-cover" />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleRemoveImage(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {(field.value || []).length < 3 && (
                          <Label htmlFor="deal-image-upload" className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                            <div className="flex flex-col items-center justify-center text-center p-2">
                              <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                <span className="font-semibold">Click to upload</span>
                              </p>
                            </div>
                            <Input id="deal-image-upload" type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                          </Label>
                        )}
                        </div>
                     </FormControl>
                    <p className="text-xs text-muted-foreground">Tip: Found an item online? You can upload screenshots.</p>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                 <Label>Acceptance Criteria</Label>
                 <p className="text-xs text-muted-foreground">Define what needs to be done for the deal to be complete.</p>
                 <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Checkbox id={`criterion-${field.id}`} disabled checked />
                        <Label htmlFor={`criterion-${field.id}`} className="flex-1 font-normal text-sm">{field.text}</Label>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => remove(index)}>
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Input 
                        placeholder="e.g., 'Color: blue', 'Weight: 2kg', or 'Service delivered by Friday'"
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
            <div className="space-y-4">
               <FormField
                    control={form.control}
                    name="partyPhone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Other Person's Phone Number</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="tel" placeholder="+233 12 345 6789" className="pl-9" {...field} />
                            </div>
                        </FormControl>
                        </FormItem>
                    )}
                />

               <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-muted" />
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t border-muted" />
              </div>

                <FormField
                    control={form.control}
                    name="partyEmail"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Other Person's Email</FormLabel>
                        <FormControl>
                           <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="email" placeholder="friend@example.com" className="pl-9" {...field} />
                            </div>
                        </FormControl>
                        </FormItem>
                    )}
                />
             
               <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-muted" />
                  <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-grow border-t border-muted" />
              </div>
              
               <FormField
                    control={form.control}
                    name="partyId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Other Person's Betweena ID</FormLabel>
                        <FormControl>
                           <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g. acme-inc" className="pl-9" {...field} />
                            </div>
                        </FormControl>
                        </FormItem>
                    )}
                />
               <FormMessage>{form.formState.errors.partyPhone?.message}</FormMessage>
               <p className="text-xs text-muted-foreground pt-2">If the person is not on Betweena, we will send an invitation to them to join the deal.</p>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Deal Amount (GHS)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="5000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Deal Deadline</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP 'at' h:mm a") : <span>Pick a date and time</span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => handleDateSelect(date, field)}
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
                                            value={field.value?.getHours() ?? ""}
                                            onChange={(e) => handleTimeChange('hours', parseInt(e.target.value, 10), field)}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="number"
                                            aria-label="Minute"
                                            className="w-16"
                                            min={0}
                                            max={59}
                                            value={field.value?.getMinutes().toString().padStart(2, '0') ?? ""}
                                            onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value, 10), field)}
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />
               <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Delivery/Pickup Location</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                    placeholder="e.g., Accra Mall or Digital Address"
                                    className="pl-9"
                                    {...field}
                                    />
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="outline">Select on Map</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Select Location</DialogTitle>
                                            <DialogDescription>
                                                Pan and zoom to find the location, then confirm.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                                            <p className="text-muted-foreground">Map placeholder</p>
                                        </div>
                                        <DialogFooter>
                                            <DialogTrigger asChild><Button type="button" variant="outline">Cancel</Button></DialogTrigger>
                                            <Button type="button" onClick={() => {
                                                const currentValue = field.value;
                                                form.setValue('location', currentValue || 'Selected from Map');
                                                const dialogCloseButton = document.querySelector('button[data-radix-dialog-close="true"]') as HTMLElement | null;
                                                dialogCloseButton?.click();
                                            }}>Confirm Location</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-6">
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-semibold text-lg">{form.getValues('title') || 'Untitled Deal'}</h3>
                    {form.getValues('images') && form.getValues('images')!.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {form.getValues('images')!.map((image, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image src={image} alt={`Deal preview ${index + 1}`} fill className="rounded-md object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="grid gap-2 text-sm pt-2">
                        <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-base">GHS {form.getValues('amount').toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Due by {form.getValues('deadline') ? format(form.getValues('deadline')!, "PPP 'at' h:mm a") : 'N/A'}</span>
                        </div>
                         {form.getValues('location') && (
                           <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{form.getValues('location')}</span>
                            </div>
                        )}
                        {(form.getValues('partyId') || form.getValues('partyEmail') || form.getValues('partyPhone')) && <hr className='my-2' />}
                        {form.getValues('partyId') && <div className="flex items-center gap-2">
                            <AtSign className="h-4 w-4 text-muted-foreground" />
                            <span>@{form.getValues('partyId')}</span>
                        </div>}
                        {form.getValues('partyEmail') && <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{form.getValues('partyEmail')}</span>
                        </div>}
                        {form.getValues('partyPhone') && <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{form.getValues('partyPhone')}</span>
                        </div>}
                         <hr className='my-2' />
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            <span>You are the <span className="font-semibold capitalize">{form.getValues('role')}</span></span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-medium">Acceptance Criteria</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {fields.map(c => <li key={c.id}>{c.text}</li>)}
                        {fields.length === 0 && <li>No criteria defined.</li>}
                    </ul>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          ) : <div />}
          
          {step < totalSteps && (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}

          {step === totalSteps && (
            <Button type="button" className="w-full" onClick={form.handleSubmit(handleFinish)}>
              <CheckCircle className="mr-2" />
              Confirm and Send
            </Button>
          )}
        </CardFooter>
      </Card>
      </form>
    </Form>
    </div>
  );
}
