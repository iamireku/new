import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, Landmark, Users, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import Image from 'next/image';

const recentTransactions = [
  { id: 'T001', description: 'Website Design', amount: 2500, type: 'incoming', status: 'completed' },
  { id: 'T002', description: 'Marketing Services', amount: -1200, type: 'outgoing', status: 'pending' },
  { id: 'T003', description: 'Logo Design', amount: 750, type: 'incoming', status: 'completed' },
  { id: 'T004', description: 'Software Subscription', amount: -99, type: 'outgoing', status: 'completed' },
  { id: 'T005', description: 'Consulting Fee', amount: 5000, type: 'incoming', status: 'in_escrow' },
];

const leaderboard = [
    { name: 'Alex Johnson', referrals: 25, avatar: 'https://placehold.co/40x40.png', hint: 'man face' },
    { name: 'Maria Garcia', referrals: 21, avatar: 'https://placehold.co/40x40.png', hint: 'woman face' },
    { name: 'David Smith', referrals: 18, avatar: 'https://placehold.co/40x40.png', hint: 'person glasses' },
    { name: 'Sophia Wang', referrals: 15, avatar: 'https://placehold.co/40x40.png', hint: 'woman smiling' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funds in Escrow</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,000.00</div>
            <p className="text-xs text-muted-foreground">Across 3 active deals</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Leaderboard</CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {leaderboard.map((user, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.referrals} referrals</p>
                        </div>
                        <div className="font-medium">{`#${index + 1}`}</div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your most recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.description}</TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                     {tx.type === 'incoming' ? 
                       <ArrowDownLeft className="h-4 w-4 text-green-500" /> : 
                       <ArrowUpRight className="h-4 w-4 text-red-500" />
                     }
                      <span className="capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-mono ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className={
                        cn({
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status === 'pending',
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'in_escrow'
                        })
                    }>
                        {tx.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
