'use client';

import { useState, useMemo, useEffect } from 'react';
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
  ShieldCheck,
  MessageSquare,
  FileText,
  AlertTriangle,
  CheckCircle,
  Truck,
  X,
  ArrowLeft,
  BellRing,
  AlarmClock,
  Info,
  UserCheck as UserCheckIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { add, isAfter } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const deal = {
  id: 'DEAL003',
  title: 'Mobile App UI/UX',
  party: 'Appify Inc.',
  date: '2023-11-05',
  deadline: '2023-11-30',
  amount: 8000,
  status: 'in_escrow',
  role: 'seller', // 'buyer' or 'seller'
  acceptanceCriteria: [
    { id: 1, text: 'Final designs delivered in Figma', completed: true },
    { id: 2, text: 'All assets exported and shared', completed: true },
    { id: 3, text: 'Prototype link provided for review', completed: false },
  ],
  timeline: [
    { date: '2023-11-05', event: 'Deal created by You (Seller)', icon: FileText },
    { date: '2023-11-06', event: 'Appify Inc. accepted the deal', icon: UserCheckIcon },
    { date: '2023-11-07', event: 'Buyer funded the deal. Money is on hold.', icon: ShieldCheck },
  ],
  messages: [
    {
      sender: 'Appify Inc.',
      message: 'Just checking on the status of the prototype. Any updates?',
      date: '2023-11-14',
    },
    { sender: 'You', message: 'Hey! Yes, I am just finishing up the final screens. Should be ready for review tomorrow.', date: '2023-11-14' },
  ],
};

const getStatusInfo = (status: string) => {
    switch (status) {
        case 'in_escrow':
            return {
                text: 'On Hold',
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                icon: <ShieldCheck className="h-4 w-4" />,
            };
        case 'funding':
            return {
                text: 'Funding',
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                icon: <Banknote className="h-4 w-4" />,
            };
        case 'dispute':
            return {
                text: 'Dispute',
                color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                icon: <AlertTriangle className="h-4 w-4" />,
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
                icon: <X className="h-4 w-4" />,
            };
        default:
            return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
};

const statusInfo = getStatusInfo(deal.status);

type Period = 'hours' | 'days' | 'weeks';

export default function DealDetailsPage({ params }: { params: { id: string } }) {
  const reversedTimeline = [...deal.timeline].reverse();
  const { toast } = useToast();
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderFigure, setReminderFigure] = useState(1);
  const [reminderPeriod, setReminderPeriod] = useState<Period>('days');

  useEffect(() => {
    document.title = `${deal.title} - Deal Details`;
  }, [deal.title]);

  const isDealInactive = deal.status === 'completed' || deal.status === 'cancelled';

  const isReminderInPast = useMemo(() => {
    if (!deal.deadline || !remindersEnabled || reminderFigure <= 0) return false;
    
    const now = new Date();
    const deadlineDate = new Date(deal.deadline);
    let nextReminderDate = add(now, { [reminderPeriod]: reminderFigure });
    
    return isAfter(nextReminderDate, deadlineDate);
  }, [reminderFigure, reminderPeriod, remindersEnabled, deal.deadline]);


  const handleRemindersToggle = (enabled: boolean) => {
    setRemindersEnabled(enabled);
    toast({
      title: `Reminders ${enabled ? 'Enabled' : 'Disabled'}`,
      description: `You will ${enabled ? 'now' : 'no longer'} receive reminders for this deal.`,
    });
  };
  
  const handleFrequencyChange = () => {
    if(remindersEnabled) {
      toast({
        title: 'Reminder Frequency Updated',
        description: `You will now receive reminders every ${reminderFigure} ${reminderPeriod}.`,
      });
    }
  }


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
                <Badge variant="secondary" className={cn("text-base", statusInfo.color)}>
                    {statusInfo.icon}
                    <span>{statusInfo.text}</span>
                </Badge>
            </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Deal Overview</CardTitle>
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
                  <p className="text-lg font-bold">{deal.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlarmClock className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="text-lg font-bold">{deal.deadline}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Acceptance Criteria</CardTitle>
              <CardDescription>
                These items must be completed to release the money.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deal.acceptanceCriteria.map((criterion) => (
                <div key={criterion.id} className="flex items-start gap-3">
                  <Checkbox id={`criterion-${criterion.id}`} checked={criterion.completed} className="mt-1" />
                  <Label htmlFor={`criterion-${criterion.id}`} className={cn("font-normal", {'line-through text-muted-foreground': criterion.completed})}>
                    {criterion.text}
                  </Label>
                </div>
              ))}
            </CardContent>
             <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-2">
                {deal.role === 'buyer' && deal.status === 'in_escrow' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full sm:w-auto"><CheckCircle className="mr-2"/>Release Money</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to release the money?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The money will be sent to the seller. Make sure all acceptance criteria have been met.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Confirm & Release</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {deal.role === 'seller' && deal.status === 'in_escrow' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full sm:w-auto"><Truck className="mr-2"/>Mark as Delivered/Completed</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Mark as Delivered/Completed?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will notify the buyer that you have completed your side of the deal. They will then be able to release the money.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Yes, Mark as Completed</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                 {deal.status === 'funding' && deal.role === 'buyer' && <Button className="w-full sm:w-auto"><Banknote className="mr-2" />Fund Deal</Button>}
                 {deal.status !== 'completed' && deal.status !== 'cancelled' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto sm:ml-auto">
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
                        <AlertDialogAction>Yes, Raise Dispute</AlertDialogAction>
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
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {reversedTimeline.map((item, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                                {index < reversedTimeline.length - 1 && <div className="w-px flex-1 bg-border" />}
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
              <CardTitle className="text-lg">Reminder Settings</CardTitle>
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
                   <Label className={cn({"text-muted-foreground": isDealInactive})}>Frequency</Label>
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
                                handleFrequencyChange();
                            }}
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
                </div>
                {isReminderInPast && !isDealInactive && (
                    <div className="flex items-center gap-2 text-xs text-yellow-600 p-2 bg-yellow-50 rounded-md">
                        <Info className="h-4 w-4" />
                        <span>This frequency will send reminders past the deal's deadline.</span>
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
                <CardTitle>Messages</CardTitle>
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
