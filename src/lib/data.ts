// /src/lib/data.ts
import { FileText, UserCheck, Lock, LucideIcon, Truck, Eye } from "lucide-react";

// Types
export type DealStatus = 'completed' | 'inHolding' | 'in_review' | 'delivered' | 'dispute' | 'cancelled';
export type DealRole = 'buyer' | 'seller';

export interface AcceptanceCriterion {
  id: number;
  text: string;
  completed: boolean;
}

export interface TimelineEvent {
  date: string;
  event: string;
  icon: LucideIcon;
}

export interface Message {
  sender: string;
  message: string;
  date: string;
}

export interface Deal {
  id: string;
  title: string;
  party: string;
  date: string;
  deadline: string;
  amount: number;
  status: DealStatus;
  role: DealRole;
  acceptanceCriteria: AcceptanceCriterion[];
  timeline: TimelineEvent[];
  messages: Message[];
  imageUrl?: string;
}

export type TransactionType = 'incoming' | 'outgoing';
export type TransactionStatus = 'completed' | 'pending' | 'inHolding';

export interface Transaction {
  id: string;
  description: string;
  party: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}


export interface WalletTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}


export interface LeaderboardUser {
    name: string;
    referrals: number;
    avatar: string;
    hint: string;
    rank: number;
}

export interface CurrentUser {
    name: string;
    referrals: number;
    referralCode: string;
}

export type PaymentMethodType = 'bank' | 'mobile_money';
export type MobileMoneyProvider = 'mtn' | 'telecel' | 'airteltigo';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  details: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    provider?: MobileMoneyProvider;
    phoneNumber?: string;
    phoneName?: string;
  };
}


// Mock Data
export const dealsData: Deal[] = [
    { id: 'DEAL001', title: 'E-commerce Platform Development', party: 'ClientCorp', date: '2023-10-26', deadline: '2023-11-30', amount: 15000, status: 'completed', role: 'seller', acceptanceCriteria: [], timeline: [], messages: [] },
    { id: 'DEAL002', title: 'Brand Identity Design', party: 'Creative LLC', date: '2023-10-22', deadline: '2023-11-30', amount: 3500, status: 'completed', role: 'buyer', acceptanceCriteria: [], timeline: [], messages: [], imageUrl: 'https://placehold.co/600x400.png' },
    { 
      id: 'DEAL003', 
      title: 'Mobile App UI/UX', 
      party: 'Appify Inc.', 
      date: '2023-11-05', 
      deadline: '2023-12-30',
      amount: 8000, 
      status: 'in_review', 
      role: 'buyer',
      acceptanceCriteria: [
        { id: 1, text: 'Final designs delivered in Figma', completed: true },
        { id: 2, text: 'All assets exported and shared', completed: true },
        { id: 3, text: 'Prototype link provided for review', completed: false },
      ],
      timeline: [
        { date: '2023-11-05', event: 'Deal created by You (Seller)', icon: FileText },
        { date: '2023-11-06', event: 'Appify Inc. accepted & funded the deal', icon: UserCheck },
        { date: '2023-11-07', event: 'Funds secured in holding.', icon: Lock },
        { date: '2023-11-15', event: 'Seller marked as Delivered.', icon: Truck },
        { date: '2023-11-15', event: 'Deal is now in review by the Buyer.', icon: Eye },
      ],
      messages: [
        { sender: 'Appify Inc.', message: 'Just checking on the status of the prototype. Any updates?', date: '2023-11-14' },
        { sender: 'You', message: 'Hey! Yes, I am just finishing up the final screens. Should be ready for review tomorrow.', date: '2023-11-14' },
      ],
    },
    { id: 'DEAL004', title: 'SEO & Content Strategy', party: 'Growth Co.', date: '2023-11-10', deadline: '2023-12-15', amount: 2500, status: 'cancelled', role: 'buyer', acceptanceCriteria: [], timeline: [], messages: [] },
    { id: 'DEAL005', title: 'API Integration Services', party: 'ConnectAll', date: '2023-11-12', deadline: '2023-12-20', amount: 6000, status: 'dispute', role: 'seller', acceptanceCriteria: [], timeline: [], messages: [] },
    { id: 'DEAL006', title: 'Q4 Marketing Campaign', party: 'AdVantage', date: '2023-11-15', deadline: '2024-01-15', amount: 12000, status: 'inHolding', role: 'seller', acceptanceCriteria: [], timeline: [], messages: [] },
    { id: 'DEAL007', title: 'Cloud Migration', party: 'Serverless Solutions', date: '2023-11-20', deadline: '2024-02-01', amount: 25000, status: 'cancelled', role: 'seller', acceptanceCriteria: [], timeline: [], messages: [] },
];

export const getDealById = (id: string): Deal | undefined => {
    return dealsData.find(deal => deal.id === id);
}

export const recentTransactions: Transaction[] = [
  { id: 'T001', description: 'Website Design', party: 'ClientCorp', amount: 2500, type: 'incoming', status: 'completed' },
  { id: 'T002', description: 'Marketing Services', party: 'AdVantage', amount: -1200, type: 'outgoing', status: 'pending' },
  { id: 'T003', description: 'Logo Design', party: 'Creative LLC', amount: 750, type: 'incoming', status: 'completed' },
  { id: 'T004', description: 'Software Subscription', party: 'SaaS Inc.', amount: -99, type: 'outgoing', status: 'completed' },
  { id: 'T005', description: 'Consulting Fee', party: 'Appify Inc.', amount: 5000, type: 'incoming', status: 'inHolding' },
  { id: 'T006', description: 'Hardware Purchase', party: 'Tech Supply Co.', amount: -850, type: 'outgoing', status: 'completed' },
  { id: 'T007', description: 'Royalty Payment', party: 'Art House', amount: 450, type: 'incoming', status: 'completed' },
];

export const leaderboard: LeaderboardUser[] = [
    { name: 'Alex Johnson', referrals: 25, avatar: 'https://placehold.co/40x40.png', hint: 'man face', rank: 1 },
    { name: 'Maria Garcia', referrals: 21, avatar: 'https://placehold.co/40x40.png', hint: 'woman face', rank: 2 },
    { name: 'David Smith', referrals: 18, avatar: 'https://placehold.co/40x40.png', hint: 'person glasses', rank: 3 },
    { name: 'You', referrals: 17, avatar: 'https://placehold.co/100x100.png', hint: 'person portrait', rank: 4 },
    { name: 'Sophia Wang', referrals: 15, avatar: 'https://placehold.co/40x40.png', hint: 'woman smiling', rank: 5 },
    { name: 'Michael Chen', referrals: 12, avatar: 'https://placehold.co/40x40.png', hint: 'man smiling', rank: 6 },
];

export const currentUser: CurrentUser = { name: 'You', referrals: 17, referralCode: 'BETA-USER-123' };

export const savedPaymentMethods: PaymentMethod[] = [
    { id: 'pm_1', type: 'mobile_money', details: { provider: 'mtn', phoneNumber: '024 123 4567', phoneName: 'User Name' } },
    { id: 'pm_2', type: 'bank', details: { bankName: 'Fidelity Bank', accountNumber: '**** **** **** 1234', accountName: 'User Name' } },
];

export const walletTransactions: WalletTransaction[] = [
  { id: 'WTX001', type: 'Deposit', date: '2023-11-28', amount: 1000, status: 'Completed', description: 'Manual deposit from linked bank account ending in 1234.' },
  { id: 'WTX002', type: 'Withdrawal', date: '2023-11-25', amount: -500, status: 'Completed', description: 'Withdrawal to MTN mobile money number 024 123 4567.' },
  { id: 'WTX003', type: 'Release from hold', date: '2023-11-22', amount: 3500, status: 'Completed', description: 'Funds released from deal "Brand Identity Design" (DEAL002) with Creative LLC.' },
  { id: 'WTX004', type: 'Funding for deal', date: '2023-11-20', amount: -8000, status: 'Completed', description: 'Funds moved to hold for deal "Mobile App UI/UX" (DEAL003) with Appify Inc.' },
  { id: 'WTX005', type: 'Withdrawal', date: '2023-11-18', amount: -2000, status: 'Pending', description: 'Withdrawal to Fidelity Bank account ending in 1234.' },
];

export const statusOptions = ['inHolding', 'in_review', 'delivered', 'completed', 'dispute', 'cancelled'];
export const roleOptions = ['all', 'seller', 'buyer'];

export const avatars = [
  { src: 'https://placehold.co/100x100.png', hint: 'abstract shape', alt: 'Avatar A' },
  { src: 'https://placehold.co/100x100.png', hint: 'abstract pattern', alt: 'Avatar B' },
  { src: 'https://placehold.co/100x100.png', hint: 'geometric design', alt: 'Avatar C' },
  { src: 'https://placehold.co/100x100.png', hint: 'colorful gradient', alt: 'Avatar D' },
  { src: 'https://placehold.co/100x100.png', hint: 'minimalist logo', alt: 'Avatar E' },
  { src: 'https://placehold.co/100x100.png', hint: 'abstract art', alt: 'Avatar F' },
];

export const industries = [
    "Agriculture",
    "Financial Technology (FinTech)",
    "E-commerce & Retail",
    "Real Estate & Construction",
    "Healthcare & Pharmaceuticals",
    "Education",
    "Technology & IT Services",
    "Tourism & Hospitality",
    "Media & Entertainment",
    "Manufacturing",
    "Energy & Mining",
    "Transportation & Logistics",
    "Other",
];
