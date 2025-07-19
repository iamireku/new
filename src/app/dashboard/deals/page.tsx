'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, ListFilter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const dealsData = [
    { id: 'DEAL001', title: 'E-commerce Platform Development', party: 'ClientCorp', date: '2023-10-26', amount: 15000, status: 'completed', role: 'seller' },
    { id: 'DEAL002', title: 'Brand Identity Design', party: 'Creative LLC', date: '2023-10-22', amount: 3500, status: 'completed', role: 'buyer' },
    { id: 'DEAL003', title: 'Mobile App UI/UX', party: 'Appify Inc.', date: '2023-11-05', amount: 8000, status: 'in_escrow', role: 'seller' },
    { id: 'DEAL004', title: 'SEO & Content Strategy', party: 'Growth Co.', date: '2023-11-10', amount: 2500, status: 'funding', role: 'buyer' },
    { id: 'DEAL005', title: 'API Integration Services', party: 'ConnectAll', date: '2023-11-12', amount: 6000, status: 'dispute', role: 'seller' },
    { id: 'DEAL006', title: 'Q4 Marketing Campaign', party: 'AdVantage', date: '2023-11-15', amount: 12000, status: 'in_escrow', role: 'buyer' },
    { id: 'DEAL007', title: 'Cloud Migration', party: 'Serverless Solutions', date: '2023-11-20', amount: 25000, status: 'cancelled', role: 'seller' },
];

const getStatusText = (status: string) => {
    if (status === 'in_escrow') return 'On Hold';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const statusOptions = ['in_escrow', 'funding', 'completed', 'dispute', 'cancelled'];
const roleOptions = ['all', 'seller', 'buyer'];


export default function DealsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');

  const handleRowClick = (dealId: string) => {
    router.push(`/dashboard/deals/${dealId}`);
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const filteredDeals = dealsData.filter(tx => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = tx.title.toLowerCase().includes(searchTermLower) || tx.party.toLowerCase().includes(searchTermLower);
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(tx.status);
    const matchesRole = roleFilter === 'all' || tx.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });
  
  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold font-headline">Deals</h1>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild>
                    <Link href="/dashboard/deals/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Start a New Deal
                    </Link>
                </Button>
                 <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Funds
                </Button>
            </div>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Deal History</CardTitle>
          <CardDescription>A list of all your deals.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                      placeholder="Search deals..." 
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <ListFilter className="mr-2" /> Filter by Status
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {statusOptions.map(status => (
                          <DropdownMenuCheckboxItem
                              key={status}
                              checked={statusFilters.includes(status)}
                              onCheckedChange={() => handleStatusFilterChange(status)}
                          >
                              {getStatusText(status)}
                          </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto capitalize">
                        {roleFilter === 'all' ? 'All Roles' : (roleFilter === 'seller' ? 'Selling' : 'Buying')}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Your Role</DropdownMenuLabel>
                      <DropdownMenuRadioGroup value={roleFilter} onValueChange={setRoleFilter}>
                         <DropdownMenuRadioItem value="all">All Roles</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="seller">Selling</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="buyer">Buying</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Other Person</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.length > 0 ? filteredDeals.map((tx) => (
                  <TableRow 
                      key={tx.id} 
                      onClick={() => handleRowClick(tx.id)}
                      className={cn(
                          'cursor-pointer',
                          {'bg-yellow-100/50 dark:bg-yellow-900/20 font-medium': tx.status === 'funding'}, 
                          {'bg-red-100/50 dark:bg-red-900/20 font-medium': tx.status === 'dispute'}
                      )}
                  >
                    <TableCell className="font-medium">{tx.title}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">{tx.party}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">{tx.date}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={
                          cn({
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'in_escrow',
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 ring-2 ring-yellow-500/50': tx.status === 'funding',
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ring-2 ring-red-500/50': tx.status === 'dispute',
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': tx.status === 'cancelled',
                          })
                      }>
                          {getStatusText(tx.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">GHS {tx.amount.toLocaleString()}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No deals found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
