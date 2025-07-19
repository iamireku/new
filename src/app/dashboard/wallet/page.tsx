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
import { PlusCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const walletTransactions = [
  { id: 'WTX001', type: 'Deposit', date: '2023-11-28', amount: 1000, status: 'Completed' },
  { id: 'WTX002', type: 'Withdrawal', date: '2023-11-25', amount: -500, status: 'Completed' },
  { id: 'WTX003', type: 'Escrow Release', date: '2023-11-22', amount: 3500, status: 'Completed' },
  { id: 'WTX004', type: 'Escrow Funding', date: '2023-11-20', amount: -8000, status: 'Completed' },
  { id: 'WTX005', type: 'Withdrawal', date: '2023-11-18', amount: -2000, status: 'Pending' },
];

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Wallet</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Money</CardTitle>
            <CardDescription>Money you can use now.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">GHS 12,345.67</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Money on Hold</CardTitle>
            <CardDescription>Money in active deals.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">GHS 5,000.00</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet History</CardTitle>
          <CardDescription>A record of your money movements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walletTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                      {tx.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'} className={tx.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-mono ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}GHS {Math.abs(tx.amount).toLocaleString()}
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
