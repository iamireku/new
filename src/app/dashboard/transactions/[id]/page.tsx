'use client';

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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const deal = {
  id: 'DEAL003',
  title: 'Mobile App UI/UX',
  party: 'Appify Inc.',
  date: '2023-11-05',
  amount: 8000,
  status: 'in_escrow',
  role: 'seller', // 'buyer' or 'seller'
  acceptanceCriteria: [
    { id: 1, text: 'Final designs delivered in Figma', completed: true },
    { id: 2, text: 'All assets exported and shared', completed: true },
    { id: 3, text: 'Prototype link provided for review', completed: false },
  ],
  timeline: [
    { date: '2023-11-05', event: 'Deal created by You (Seller)' },
    { date: '2023-11-06', event: 'Appify Inc. accepted the deal' },
    { date: '2023-11-07', event: 'Buyer funded the deal. Money is on hold.' },
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

export default function DealDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
        <Link href="/dashboard/transactions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
                <h1 className="text-3xl font-bold font-headline">{deal.title}</h1>
                <p className="text-muted-foreground">Deal ID: {params.id}</p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className={statusInfo.color}>
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
             <CardFooter className="border-t pt-4">
                {deal.role === 'buyer' && deal.status === 'in_escrow' && <Button><CheckCircle className="mr-2"/>Release Money</Button>}
                {deal.role === 'seller' && deal.status === 'in_escrow' && <Button><Truck className="mr-2"/>Mark as Shipped/Completed</Button>}
                 {deal.status === 'funding' && deal.role === 'buyer' && <Button><Banknote className="mr-2" />Fund Deal</Button>}
                 {deal.status !== 'completed' && deal.status !== 'cancelled' && (
                    <Button variant="outline" className="ml-auto">
                        <AlertTriangle className="mr-2"/>Raise a Dispute
                    </Button>
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
                    {deal.timeline.map((item, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <FileText className="h-4 w-4" />
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
            <CardHeader>
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