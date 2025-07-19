import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const transactions = [
    { id: 'DEAL001', title: 'E-commerce Platform Development', party: 'ClientCorp', date: '2023-10-26', amount: 15000, status: 'completed' },
    { id: 'DEAL002', title: 'Brand Identity Design', party: 'Creative LLC', date: '2023-10-22', amount: 3500, status: 'completed' },
    { id: 'DEAL003', title: 'Mobile App UI/UX', party: 'Appify Inc.', date: '2023-11-05', amount: 8000, status: 'in_escrow' },
    { id: 'DEAL004', title: 'SEO & Content Strategy', party: 'Growth Co.', date: '2023-11-10', amount: 2500, status: 'funding' },
    { id: 'DEAL005', title: 'API Integration Services', party: 'ConnectAll', date: '2023-11-12', amount: 6000, status: 'dispute' },
    { id: 'DEAL006', title: 'Q4 Marketing Campaign', party: 'AdVantage', date: '2023-11-15', amount: 12000, status: 'in_escrow' },
    { id: 'DEAL007', title: 'Cloud Migration', party: 'Serverless Solutions', date: '2023-11-20', amount: 25000, status: 'cancelled' },
];

const getStatusText = (status: string) => {
    if (status === 'in_escrow') return 'On Hold';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold font-headline">Transactions</h1>
            <Button asChild>
                <Link href="/dashboard/deals/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Start a New Deal
                </Link>
            </Button>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A list of all your deals.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Other Person</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className={cn({'bg-yellow-50 dark:bg-yellow-900/20': tx.status === 'funding', 'bg-red-50 dark:bg-red-900/20': tx.status === 'dispute'})}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell className="font-medium">{tx.title}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.party}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={
                        cn({
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'in_escrow',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status === 'funding',
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': tx.status === 'dispute',
                             'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': tx.status === 'cancelled',
                        })
                    }>
                        {getStatusText(tx.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">GHS {tx.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Deal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
