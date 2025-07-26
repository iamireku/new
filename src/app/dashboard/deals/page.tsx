// /src/app/dashboard/deals/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { PlusCircle, Search, ListFilter, ChevronDown, Handshake, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusOptions, Deal } from '@/lib/data';
import { getDeals } from '@/lib/services/deals.service';
import { format } from 'date-fns';


const getStatusText = (status: string) => {
    switch (status) {
        case 'inHolding': return 'On Hold';
        case 'in_review': return 'In Review';
        default: return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
    }
}

const DEALS_PER_PAGE = 5;

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [visibleDealsCount, setVisibleDealsCount] = useState(DEALS_PER_PAGE);
  
  useEffect(() => {
    async function fetchData() {
      const dealsData = await getDeals();
      setDeals(dealsData);
    }
    fetchData();
  }, []);

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

  const filteredDeals = deals.filter(tx => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = tx.title.toLowerCase().includes(searchTermLower) || tx.party.toLowerCase().includes(searchTermLower);
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(tx.status);
    const matchesRole = roleFilter === 'all' || tx.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const dealsToShow = filteredDeals.slice(0, visibleDealsCount);
  
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
            </div>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Deal History</CardTitle>
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
                {dealsToShow.length > 0 ? dealsToShow.map((tx) => (
                  <TableRow 
                      key={tx.id} 
                      onClick={() => handleRowClick(tx.id)}
                      className={cn(
                          'cursor-pointer',
                          {'bg-yellow-100/50 dark:bg-yellow-900/20 font-medium': tx.status === 'pending'},
                          {'bg-purple-100/50 dark:bg-purple-900/20 font-medium': tx.status === 'in_review'}, 
                          {'bg-red-100/50 dark:bg-red-900/20 font-medium': tx.status === 'dispute'}
                      )}
                  >
                    <TableCell className="font-medium">{tx.title}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">{tx.party}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">{format(new Date(tx.date), 'PPP')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={
                          cn({
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'inHolding',
                              'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 ring-2 ring-purple-500/50': tx.status === 'in_review',
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ring-2 ring-red-500/50': tx.status === 'dispute',
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': tx.status === 'cancelled',
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200': tx.status === 'delivered',
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 ring-2 ring-yellow-500/50': tx.status === 'pending',
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
                        <div className="flex flex-col items-center gap-2">
                            <Handshake className="h-10 w-10 text-muted-foreground"/>
                            <p className="font-semibold">No deals found.</p>
                            <p className="text-muted-foreground text-sm">Try adjusting your search or filter.</p>
                        </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         {filteredDeals.length > visibleDealsCount && (
            <CardFooter className="justify-center border-t pt-4">
                <Button 
                    variant="outline" 
                    onClick={() => setVisibleDealsCount(prev => prev + DEALS_PER_PAGE)}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Load More
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
