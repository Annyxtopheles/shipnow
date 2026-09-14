export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'Dispatcher' | 'Driver' | 'Hub Manager' | 'Consignor';
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ChatConversation {
  id: string;
  participantName: string;
  participantRole: 'Commercial Driver' | 'Facility Manager' | 'Consignor Rep' | 'Fleet Maintenance';
  participantDetail: string; // e.g., "Unit FLEET-TRK-104 · LAX-01"
  avatarInitials: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  online: boolean;
  messages: ChatMessage[];
}

export const seedConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    participantName: 'Robert Martinez',
    participantRole: 'Commercial Driver',
    participantDetail: 'FLEET-TRK-104 · I-80 Corridor',
    avatarInitials: 'RM',
    unreadCount: 2,
    lastMessage: 'Cleared the Denver scale. Approaching Iowa border now.',
    lastTimestamp: '4:10 PM',
    online: true,
    messages: [
      {
        id: 'm1',
        senderName: 'Central Dispatch',
        senderRole: 'Dispatcher',
        text: 'Hi Robert, checking in on #SH9482710 audio pallet load. How are road conditions in Nebraska?',
        timestamp: '02:15 PM',
        isSelf: true,
      },
      {
        id: 'm2',
        senderName: 'Robert Martinez',
        senderRole: 'Driver',
        text: 'Dry pavement and clear skies along I-80. Cruising at 64 mph smoothly.',
        timestamp: '02:18 PM',
        isSelf: false,
      },
      {
        id: 'm3',
        senderName: 'Central Dispatch',
        senderRole: 'Dispatcher',
        text: 'Great. Receiving dock at Chicago ORD-02 is prepped for your 6:45 PM ETA at bay 4.',
        timestamp: '03:50 PM',
        isSelf: true,
      },
      {
        id: 'm4',
        senderName: 'Robert Martinez',
        senderRole: 'Driver',
        text: 'Cleared the Denver scale. Approaching Iowa border now.',
        timestamp: '04:10 PM',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participantName: 'Elena Rostova',
    participantRole: 'Facility Manager',
    participantDetail: 'East Coast Mega Fulfillment (JFK-04)',
    avatarInitials: 'ER',
    unreadCount: 1,
    lastMessage: 'Apparel sorting bay is cleared for inbound manifest #SH22170.',
    lastTimestamp: '3:25 PM',
    online: true,
    messages: [
      {
        id: 'er-1',
        senderName: 'Central Dispatch',
        senderRole: 'Dispatcher',
        text: 'Elena, heads up on JFK-04 capacity reaching 95%. Are transfers scheduled for outbound dispatches?',
        timestamp: '01:30 PM',
        isSelf: true,
      },
      {
        id: 'er-2',
        senderName: 'Elena Rostova',
        senderRole: 'Hub Manager',
        text: 'Yes, 19 dispatches outbound by 6 PM will drop capacity back to 84%.',
        timestamp: '02:00 PM',
        isSelf: false,
      },
      {
        id: 'er-3',
        senderName: 'Elena Rostova',
        senderRole: 'Hub Manager',
        text: 'Apparel sorting bay is cleared for inbound manifest #SH22170.',
        timestamp: '03:25 PM',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-3',
    participantName: 'TechGear Client Rep (Marcus)',
    participantRole: 'Consignor Rep',
    participantDetail: 'TechGear Inc. Enterprise Account',
    avatarInitials: 'TG',
    unreadCount: 0,
    lastMessage: 'Invoice #INV-2026-101 received. Payment routed via ACH.',
    lastTimestamp: '1:15 PM',
    online: false,
    messages: [
      {
        id: 'tg-1',
        senderName: 'TechGear Client Rep',
        senderRole: 'Consignor',
        text: 'Can we get confirmation on shipment tracking #SH9482710?',
        timestamp: '11:00 AM',
        isSelf: false,
      },
      {
        id: 'tg-2',
        senderName: 'Central Dispatch',
        senderRole: 'Dispatcher',
        text: 'Confirmed in transit. Live telemetry is shared with your logistics coordinator.',
        timestamp: '11:05 AM',
        isSelf: true,
      },
      {
        id: 'tg-3',
        senderName: 'TechGear Client Rep',
        senderRole: 'Consignor',
        text: 'Invoice #INV-2026-101 received. Payment routed via ACH.',
        timestamp: '01:15 PM',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-4',
    participantName: 'Capt. James Vance',
    participantRole: 'Commercial Driver',
    participantDetail: 'Air Cargo 767 · SeaTac to Miami Flight 402',
    avatarInitials: 'JV',
    unreadCount: 0,
    lastMessage: 'Level at FL340. Tailwind assisting, 15 min early arrival.',
    lastTimestamp: '3:30 PM',
    online: true,
    messages: [
      {
        id: 'jv-1',
        senderName: 'Capt. James Vance',
        senderRole: 'Driver',
        text: 'Airway bill verified. Cargo door sealed and wheels up from Seattle.',
        timestamp: '01:10 PM',
        isSelf: false,
      },
      {
        id: 'jv-2',
        senderName: 'Capt. James Vance',
        senderRole: 'Driver',
        text: 'Level at FL340. Tailwind assisting, 15 min early arrival.',
        timestamp: '03:30 PM',
        isSelf: false,
      },
    ],
  },
];
