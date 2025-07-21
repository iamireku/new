// /src/app/dashboard/deals/[id]/page.tsx
'use client';

import { useState, useMemo, useEffect, use } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Banknote,
  Users,
  Calendar,
  Lock,
  MessageSquare,
  FileText,
  AlertTriangle,
  CheckCircle,
  Truck,
  XCircle,
  ArrowLeft,
  BellRing,
  AlarmClock,
  Info,
  UserCheck,
  PlusCircle,
  Building,
  Phone,
  FilePenLine,
  Eye,
  MapPin,
  X,
  Handshake,
  CircleDollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { add, isAfter, format, formatISO, differenceInDays } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getDealById, savedPaymentMethods, Deal, TimelineEvent, DealRole } from '@/lib/data';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const getStatusInfo = (status: string) => {
    switch (status) {
        case 'inHolding':
            return {
                text: 'On Hold',
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                icon: <Lock className="h-4 w-4" />,
            };
        case 'in_review':
             return {
                text: 'In Review',
                color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                icon: <Eye className="h-4 w-4" />,
            };
        case 'dispute':
            return {
                text: 'Dispute',
                color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                icon: <AlertTriangle className="h-4 w-4" />,
            };
        case 'resolution_pending':
            return {
                text: 'Resolution Pending',
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                icon: <Handshake className="h-4 w-4" />,
            };
         case 'completed':
            return {
                text: 'Completed',
                color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                icon: <CheckCircle className="h-4 w-4" />,
            };
        case 'cancelled':
             return {
                text: 'Cancelled',
                color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                icon: <XCircle className="h-4 w-4" />,
            };
        case 'delivered':
            return {
                text: 'Delivered',
                color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                icon: <Truck className="h-4 w-4" />,
            }
        default:
            return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
};

type Period = 'hours' | 'days' | 'weeks';

// In a real app, this would be a system setting, e.g., 7 days.
const BUYER_RESPONSE_PERIOD_DAYS = 7;

function DealDetails({ params }: { params: { id: string } }) {
  const initialDeal = useMemo(() => getDealById(params.id), [params.id]);
  const { toast } = useToast();

  const [deal, setDeal] = useState<Deal | undefined>(initialDeal);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderFigure, setReminderFigure] = useState(1);
  const [reminderPeriod, setReminderPeriod] = useState<Period>('days');


  useEffect(() => {
    if (deal) {
      document.title = `${deal.title} - Deal Details`;
    }
  }, [deal]);

  if (!deal) {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md p-8 text-center">
                <CardTitle className="text-2xl font-headline">Deal Not Found</CardTitle>
                <CardDescription>The deal you are looking for does not exist or has been removed.</CardDescription>
                <Button asChild className="mt-4">
                    <Link href="/dashboard/deals">Back to Deals</Link>
                </Button>
            </Card>
        </div>
    );
  }

  const handleDealUpdate = (updates: Partial<Deal>, newTimelineEvent?: Omit<TimelineEvent, 'icon'>) => {
    setDeal(prevDeal => {
        if (!prevDeal) return undefined;
        const updatedDeal = { ...prevDeal, ...updates };

        if (newTimelineEvent) {
            let icon: any = FileText;
            if (updates.status === 'delivered') icon = Truck;
            if (updates.status === 'in_review') icon = Eye;
            if (updates.status === 'completed') icon = CheckCircle;
            if (updates.status === 'dispute') icon = AlertTriangle;
            if (updates.status === 'resolution_pending') icon = Handshake;
            if (updates.status && ['inHolding', 'delivered', 'in_review'].includes(updates.status)) icon = CheckCircle;


            updatedDeal.timeline.unshift({ ...newTimelineEvent, icon });
        }
        
        return updatedDeal;
    });
  };

  const handleMarkAsDelivered = () => {
    const today = formatISO(new Date());
    handleDealUpdate(
      { status: 'in_review', deliveredDate: today },
      { date: format(new Date(), 'PPP'), event: 'You marked as delivered. Buyer is reviewing.' }
    );
    toast({ title: "Deal Marked as Delivered", description: "The buyer has been notified to review and release funds." });
  };

  const handleReleaseFunds = () => {
    const updatedCriteria = deal.acceptanceCriteria.map(c => ({ ...c, completed: true }));
    handleDealUpdate(
      { status: 'completed', acceptanceCriteria: updatedCriteria },
      { date: format(new Date(), 'PPP'), event: 'Funds released. Deal completed.' }
    );
    toast({ title: "Funds Released!", description: "The money has been sent to the seller." });
  };

  const handleClaimFunds = () => {
    const updatedCriteria = deal.acceptanceCriteria.map(c => ({ ...c, completed: true }));
    handleDealUpdate(
      { status: 'completed', acceptanceCriteria: updatedCriteria },
      { date: format(new Date(), 'PPP'), event: 'Funds claimed due to buyer non-responsiveness. Deal completed.' }
    );
    toast({ title: "Funds Claimed!", description: "The money has been released to your account." });
  };
  
  const handleRaiseDispute = () => {
    handleDealUpdate(
        { status: 'dispute', statusBeforeDispute: deal.status },
        { date: format(new Date(), 'PPP'), event: 'Dispute raised. Deal paused.' }
    );
    toast({ title: "Dispute Raised", description: "The deal is now on hold. Our team will be in touch.", variant: 'destructive'});
  }

  const handleProposeResolution = () => {
    handleDealUpdate(
        { status: 'resolution_pending', resolutionInitiator: deal.role },
        { date: format(new Date(), 'PPP'), event: 'You proposed to resolve the dispute.' }
    );
    toast({ title: "Resolution Proposed", description: "Waiting for the other party to approve." });
  }

  const handleApproveResolution = () => {
    handleDealUpdate(
        { status: deal.statusBeforeDispute, resolutionInitiator: undefined },
        { date: format(new Date(), 'PPP'), event: 'Dispute resolved. The deal is now active again.' }
    );
    toast({ title: "Dispute Resolved!", description: "The deal has been restored to its previous state." });
  }

  const statusInfo = getStatusInfo(deal.status);

  const isDealInactive = deal.status === 'completed' || deal.status === 'cancelled';
  const canAmendDeal = deal.status === 'inHolding';
  const isResolutionProposedByOtherParty = deal.status === 'resolution_pending' && deal.resolutionInitiator !== deal.role;
  
  const daysSinceDelivery = deal.deliveredDate ? differenceInDays(new Date(), new Date(deal.deliveredDate)) : 0;
  const canSellerClaimFunds = deal.role === 'seller' && deal.status === 'in_review' && daysSinceDelivery > BUYER_RESPONSE_PERIOD_DAYS;


  const isReminderInPast = useMemo(() => {
    if (!deal.deadline || !remindersEnabled || reminderFigure <= 0) return false;
    
    const now = new Date();
    const deadlineDate = new Date(deal.deadline);
    let reminderDate = add(deadlineDate, { [reminderPeriod]: -reminderFigure });
    
    return isAfter(now, reminderDate);
  }, [reminderFigure, reminderPeriod, remindersEnabled, deal.deadline]);


  const handleRemindersToggle = (enabled: boolean) => {
    setRemindersEnabled(enabled);
    if (!isDealInactive) {
      toast({
        title: `Reminders ${enabled ? 'Enabled' : 'Disabled'}`,
        description: `You will ${enabled ? 'now' : 'no longer'} receive reminders for this deal.`,
      });
    }
  };
  
  const handleFrequencyChange = () => {
    if(remindersEnabled && !isDealInactive) {
      toast({
        title: 'Reminder Frequency Updated',
        description: `You will now be reminded ${reminderFigure} ${reminderPeriod} before the deadline.`,
      });
    }
  }

  const formattedDeadline = deal.deadline ? format(new Date(deal.deadline), "PPP 'at' h:mm a") : 'Not set';

  return (
    <div className="space-y-6">
        <Link href="/dashboard/deals" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
                <h1 className="text-3xl font-bold font-headline">{deal.title}</h1>
                <p className="text-muted-foreground">Deal ID: {params.id}</p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className={cn("text-base gap-2", statusInfo.color)}>
                    {statusInfo.icon}
                    <span>{statusInfo.text}</span>
                </Badge>
            </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
            {deal.imageUrls && deal.imageUrls.length > 0 && (
            <Card>
                <CardContent className="p-0 relative">
                     <Carousel className="w-full rounded-t-lg overflow-hidden">
                        <CarouselContent>
                            {deal.imageUrls.map((url, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-video">
                                        <Image
                                            src={url}
                                            alt={`${deal.title} image ${index + 1}`}
                                            fill
                                            className={cn("object-cover", { "opacity-50": isDealInactive })}
                                            data-ai-hint="product image"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {deal.imageUrls.length > 1 && (
                            <>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4" />
                            </>
                        )}
                    </Carousel>
                     {isDealInactive && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-t-lg">
                           <Badge variant="secondary" className={cn("text-lg gap-2", statusInfo.color)}>
                              {statusInfo.icon}
                              <span>{statusInfo.text}</span>
                          </Badge>
                        </div>
                    )}
                </CardContent>
            </Card>
            )}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Deal Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Banknote className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-bold">GHS {deal.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{deal.role === 'seller' ? 'Buyer' : 'Seller'}</p>
                  <p className="text-lg font-bold">{deal.party}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Creation Date</p>
                  <p className="text-lg font-bold">{format(new Date(deal.date), 'PPP')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlarmClock className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="text-lg font-bold">{formattedDeadline}</p>
                </div>
              </div>
               {deal.location && (
                 <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-lg font-bold">{deal.location}</p>
                    </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Acceptance Criteria</CardTitle>
              <CardDescription>
                These items must be completed to release the money.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deal.acceptanceCriteria.map((criterion) => (
                <div key={criterion.id} className="flex items-start gap-3">
                  <Checkbox id={`criterion-${criterion.id}`} checked={criterion.completed} disabled className="mt-1" />
                  <Label htmlFor={`criterion-${criterion.id}`} className={cn("font-normal", {'line-through text-muted-foreground': criterion.completed})}>
                    {criterion.text}
                  </Label>
                </div>
              ))}
            </CardContent>
             <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                {deal.role === 'buyer' && deal.status === 'in_review' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button><CheckCircle className="mr-2"/>Accept & Release Money</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to release the money?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The funds will be sent to the seller. Please ensure all acceptance criteria have been met to your satisfaction.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReleaseFunds}>Confirm & Release</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {deal.role === 'seller' && deal.status === 'inHolding' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button><Truck className="mr-2"/>I Have Delivered</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delivery?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will notify the buyer that you have completed your side of the deal. The deal will move to the "In Review" stage, and the buyer will be prompted to release the funds.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleMarkAsDelivered}>Yes, Mark as Delivered</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {canSellerClaimFunds && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="bg-orange-500 hover:bg-orange-600">
                                <CircleDollarSign className="mr-2 h-4 w-4" />
                                Claim Funds
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Claim Funds Due to Non-responsiveness?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    The buyer has not responded within the {BUYER_RESPONSE_PERIOD_DAYS}-day review period. You can now claim the funds. This action is final and will complete the deal.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClaimFunds}>Yes, Claim Funds</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                 {deal.status === 'dispute' && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button><Handshake className="mr-2 h-4 w-4" />Resolve Dispute</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Propose to Resolve Dispute?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This will send a request to the other party to resolve the dispute. If they accept, the deal will return to its previous state.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleProposeResolution}>Yes, Propose Resolution</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                 )}
                 {isResolutionProposedByOtherParty && (
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button><CheckCircle className="mr-2 h-4 w-4" />Approve Resolution</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Approve Dispute Resolution?</AlertDialogTitle>
                                <AlertDialogDescription>
                                By approving, you agree to resolve the dispute and continue the deal from where it left off.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleApproveResolution}>Yes, Approve</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                 )}
                 
                 <div className="flex-grow" />
                 {canAmendDeal && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" disabled>
                                    <FilePenLine className="mr-2"/>Amend Deal
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This feature is coming soon!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                 )}
                 {!isDealInactive && deal.status !== 'dispute' && deal.status !== 'resolution_pending' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                          <AlertTriangle className="mr-2"/>Raise a Dispute
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to raise a dispute?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will pause the deal and a member of our team will contact both parties to resolve the issue. This should only be used as a last resort.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRaiseDispute}>Yes, Raise Dispute</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                 )}
            </CardFooter>
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">History</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {deal.timeline.map((item, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                                {index < deal.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{item.event}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BellRing className="h-5 w-5" />
              <CardTitle className="text-lg font-headline">Reminder Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="reminders-enabled" className={cn("font-medium", {"text-muted-foreground": isDealInactive})}>
                        Enable Reminders
                    </Label>
                    <Switch 
                      id="reminders-enabled" 
                      checked={remindersEnabled}
                      onCheckedChange={handleRemindersToggle}
                      disabled={isDealInactive}
                    />
                </div>
                <div className="space-y-2">
                   <Label className={cn({"text-muted-foreground": isDealInactive || !remindersEnabled})}>Frequency</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            className="w-20"
                            value={reminderFigure}
                            onChange={(e) => setReminderFigure(parseInt(e.target.value, 10) || 1)}
                            onBlur={handleFrequencyChange}
                            min="1"
                            disabled={!remindersEnabled || isDealInactive}
                        />
                        <Select
                            value={reminderPeriod}
                            onValueChange={(value: Period) => {
                                setReminderPeriod(value);
                            }}
                            onClose={handleFrequencyChange}
                            disabled={!remindersEnabled || isDealInactive}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">Set a reminder before the deadline.</p>
                </div>
                {isReminderInPast && !isDealInactive && (
                    <div className="flex items-center gap-2 text-xs text-yellow-600 p-2 bg-yellow-50 rounded-md">
                        <Info className="h-4 w-4" />
                        <span>This reminder is in the past.</span>
                    </div>
                )}
                 {isDealInactive && (
                    <p className="text-xs text-muted-foreground">
                        Reminders are disabled for completed or cancelled deals.
                    </p>
                )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5"/>
                <CardTitle className="font-headline">Messages</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4 text-sm">
                    {deal.messages.map((msg, index) => (
                        <div key={index} className={cn("p-3 rounded-lg", msg.sender === 'You' ? "bg-primary/10" : "bg-muted")}>
                            <p className="font-semibold">{msg.sender}</p>
                            <p className="text-muted-foreground">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DealDetailsPage({ params: paramsPromise }: { params: { id: string } }) {
  const params = use(paramsPromise);
  return <DealDetails params={params} />;
}
    
