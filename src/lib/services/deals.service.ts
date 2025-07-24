// /src/lib/services/deals.service.ts
// /src/lib/services/deals.service.ts
'use server';

import { 
  dealsData, 
  Deal, 
  AcceptanceCriterion,
  DealRole,
} from '@/lib/data';
import { format, formatISO } from 'date-fns';

// This function simulates fetching a list of all deals.
// In the future, this will make an API call.
export async function getDeals(): Promise<Deal[]> {
  // Deep copy to simulate immutable data from an API
  return JSON.parse(JSON.stringify(dealsData));
}

// This function simulates fetching a single deal by its ID.
// In the future, this will make an API call.
export async function getDealById(id: string): Promise<Deal | undefined> {
  const deal = dealsData.find(deal => deal.id === id);
  // Deep copy to simulate immutable data from an API
  return deal ? JSON.parse(JSON.stringify(deal)) : undefined;
}

// This function simulates creating a new deal.
// In the future, this will make an API call.
export async function createDeal(newDealData: {
  title: string;
  party: string;
  amount: number;
  role: DealRole;
  imageUrls: string[];
  deadline: string;
  acceptanceCriteria: Omit<AcceptanceCriterion, 'completed'>[];
  location?: string;
}): Promise<Deal> {
  const newDeal: Deal = {
    id: `DEAL${String(dealsData.length + 1).padStart(3, '0')}`,
    title: newDealData.title,
    party: newDealData.party,
    date: formatISO(new Date()),
    deadline: newDealData.deadline,
    amount: newDealData.amount,
    status: 'pending',
    role: newDealData.role === 'buyer' ? 'seller' : 'buyer', // The role of the user creating the deal vs the role in the deal object
    acceptanceCriteria: newDealData.acceptanceCriteria.map(c => ({ ...c, completed: false })),
    timeline: [
      { 
        date: format(new Date(), 'PPP'), 
        event: `You created this deal. Awaiting acceptance from ${newDealData.party}.`, 
        iconName: 'Send' 
      } as any,
    ],
    messages: [],
    imageUrls: newDealData.imageUrls,
    location: newDealData.location,
  };
  
  dealsData.unshift(newDeal); // Prepend to our mock data array
  
  // In a real API, you'd return the created object from the server.
  return JSON.parse(JSON.stringify(newDeal));
}
