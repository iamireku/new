// /src/hooks/use-deal.ts
'use client';

import { useReducer, useEffect } from 'react';
import type { Deal } from '@/lib/data';
import { getDealById } from '@/lib/services/deals.service';
import { dealReducer, DealAction } from '@/lib/deal-reducer';
import { useToast } from '@/hooks/use-toast';

export function useDeal(dealId: string) {
  const { toast } = useToast();

  const [deal, dispatch] = useReducer(dealReducer, null);

  useEffect(() => {
    async function fetchDeal() {
      const initialDeal = await getDealById(dealId);
      if (initialDeal) {
        // This simulates fetching and attaching the icon component after getting data
        initialDeal.timeline = initialDeal.timeline.map(event => ({
            ...event,
            // @ts-ignore
            icon: event.iconName ? getIconComponent(event.iconName) : event.icon
        }));
        dispatch({ type: 'SET_DEAL', payload: initialDeal });
      }
    }
    if (dealId) {
      fetchDeal();
    }
  }, [dealId]);

  const performAction = (action: DealAction, successToast: { title: string; description: string; variant?: "default" | "destructive" | null | undefined }) => {
    dispatch(action);
    toast({
      title: successToast.title,
      description: successToast.description,
      variant: successToast.variant,
    });
  };

  const acceptAndFund = () => performAction(
    { type: 'ACCEPT_AND_FUND' },
    { title: "Deal Accepted & Funded!", description: "The seller has been notified to begin work." }
  );

  const rejectDeal = (reason: string) => performAction(
    { type: 'REJECT', payload: { reason } },
    { title: "Deal Rejected", description: "The deal has been cancelled.", variant: "destructive" }
  );

  const requestEdits = (message: string) => performAction(
    { type: 'REQUEST_EDITS', payload: { message } },
    { title: "Edit Request Sent", description: "Your message has been sent to the other party." }
  );

  const markAsDelivered = () => performAction(
    { type: 'MARK_AS_DELIVERED' },
    { title: "Deal Marked as Delivered", description: "The buyer has been notified to review and release funds." }
  );

  const releaseFunds = () => performAction(
    { type: 'RELEASE_FUNDS' },
    { title: "Funds Released!", description: "The money has been sent to the seller." }
  );
  
  const claimFunds = () => performAction(
    { type: 'CLAIM_FUNDS' },
    { title: "Funds Claimed!", description: "The money has been released to your account." }
  );

  const raiseDispute = () => performAction(
    { type: 'RAISE_DISPUTE' },
    { title: "Dispute Raised", description: "The deal is now on hold. Our team will be in touch.", variant: 'destructive'}
  );

  const proposeResolution = () => {
    if(!deal) return;
    performAction(
        { type: 'PROPOSE_RESOLUTION', payload: { role: deal.role } },
        { title: "Resolution Proposed", description: "Waiting for the other party to approve." }
    );
  }

  const approveResolution = () => performAction(
    { type: 'APPROVE_RESOLUTION' },
    { title: "Dispute Resolved!", description: "The deal has been restored to its previous state." }
  );

  return {
    deal,
    acceptAndFund,
    rejectDeal,
    requestEdits,
    markAsDelivered,
    releaseFunds,
    claimFunds,
    raiseDispute,
    proposeResolution,
    approveResolution
  };
}

// Helper function to get icon component from string name
import { FileText, Truck, Eye, CheckCircle, AlertTriangle, Handshake, Lock, Send, XCircle } from 'lucide-react';

function getIconComponent(iconName: string) {
    switch(iconName) {
      case 'Truck': return Truck;
      case 'Eye': return Eye;
      case 'CheckCircle': return CheckCircle;
      case 'AlertTriangle': return AlertTriangle;
      case 'Handshake': return Handshake;
      case 'Lock': return Lock;
      case 'Send': return Send;
      case 'XCircle': return XCircle;
      default: return FileText;
    }
}
