// /src/lib/deal-reducer.ts
// /src/lib/deal-reducer.ts
'use client';

import { format, formatISO } from 'date-fns';
import type { Deal, TimelineEvent, DealRole } from '@/lib/data';
import { FileText, Truck, Eye, CheckCircle, AlertTriangle, Handshake, Lock, Send, XCircle } from 'lucide-react';

export type DealAction =
  | { type: 'SET_DEAL'; payload: Deal }
  | { type: 'ACCEPT_AND_FUND' }
  | { type: 'REJECT'; payload: { reason: string } }
  | { type: 'REQUEST_EDITS'; payload: { message: string } }
  | { type: 'MARK_AS_DELIVERED' }
  | { type: 'RELEASE_FUNDS' }
  | { type: 'CLAIM_FUNDS' }
  | { type: 'RAISE_DISPUTE' }
  | { type: 'PROPOSE_RESOLUTION'; payload: { role: DealRole } }
  | { type: 'APPROVE_RESOLUTION' };


export function dealReducer(deal: Deal | null, action: DealAction): Deal | null {
  if (action.type === 'SET_DEAL') {
    return action.payload;
  }

  if (!deal) {
    return null;
  }

  const now = new Date();
  const today = format(now, 'PPP');

  const createTimelineEvent = (event: string, status: Deal['status']): Omit<TimelineEvent, 'icon'> & { iconName: string } => {
    let iconName = 'FileText';
    if (status === 'delivered') iconName = 'Truck';
    if (status === 'in_review') iconName = 'Eye';
    if (status === 'completed') iconName = 'CheckCircle';
    if (status === 'dispute') iconName = 'AlertTriangle';
    if (status === 'resolution_pending') iconName = 'Handshake';
    if (status === 'inHolding') iconName = 'Lock';
    if (status === 'pending') iconName = 'Send';
    if (status === 'cancelled') iconName = 'XCircle';
    if (status && ['created'].includes(status)) iconName = 'FileText';
    
    return { date: today, event, iconName };
  };

  const getIconComponent = (iconName: string) => {
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

  switch (action.type) {
    case 'ACCEPT_AND_FUND': {
      const event = createTimelineEvent('You accepted and funded the deal. The deal is now active.', 'inHolding');
      return {
        ...deal,
        status: 'inHolding',
        timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
      };
    }
    case 'REJECT': {
        const event = createTimelineEvent(`You rejected the deal. Reason: ${action.payload.reason}`, 'cancelled');
        return {
            ...deal,
            status: 'cancelled',
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'REQUEST_EDITS': {
        const newMessage = { sender: 'You', message: `Requesting edits: ${action.payload.message}`, date: now.toISOString() };
        const event = createTimelineEvent('You requested edits to the deal.', deal.status);
        return {
            ...deal,
            messages: [...deal.messages, newMessage],
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'MARK_AS_DELIVERED': {
        const event = createTimelineEvent('You marked as delivered. Buyer is reviewing.', 'in_review');
        return {
            ...deal,
            status: 'in_review',
            deliveredDate: formatISO(now),
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'RELEASE_FUNDS': {
        const updatedCriteria = deal.acceptanceCriteria.map(c => ({ ...c, completed: true }));
        const event = createTimelineEvent('Funds released. Deal completed.', 'completed');
        return {
            ...deal,
            status: 'completed',
            acceptanceCriteria: updatedCriteria,
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'CLAIM_FUNDS': {
        const updatedCriteria = deal.acceptanceCriteria.map(c => ({ ...c, completed: true }));
        const event = createTimelineEvent('Funds claimed due to buyer non-responsiveness. Deal completed.', 'completed');
        return {
            ...deal,
            status: 'completed',
            acceptanceCriteria: updatedCriteria,
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'RAISE_DISPUTE': {
        const event = createTimelineEvent('Dispute raised. Deal paused.', 'dispute');
        return {
            ...deal,
            status: 'dispute',
            statusBeforeDispute: deal.status,
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'PROPOSE_RESOLUTION': {
        const event = createTimelineEvent('You proposed to resolve the dispute.', 'resolution_pending');
        return {
            ...deal,
            status: 'resolution_pending',
            resolutionInitiator: action.payload.role,
            timeline: [{...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    case 'APPROVE_RESOLUTION': {
        const event = createTimelineEvent('Dispute resolved. The deal is now active again.', deal.statusBeforeDispute || 'inHolding');
        return {
            ...deal,
            status: deal.statusBeforeDispute || 'inHolding',
            resolutionInitiator: undefined,
            timeline: [{ ...event, icon: getIconComponent(event.iconName) }, ...deal.timeline],
        };
    }
    default: {
      return deal;
    }
  }
}
