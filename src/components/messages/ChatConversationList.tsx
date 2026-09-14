import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Search } from 'lucide-react';
import type { ChatConversation } from '@/data/messages';

interface ChatConversationListProps {
  conversations: ChatConversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
}

export function ChatConversationList({
  conversations,
  activeId,
  onSelectConversation,
}: ChatConversationListProps) {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter((c) => {
    return (
      c.participantName.toLowerCase().includes(search.toLowerCase()) ||
      c.participantDetail.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Card className="flex flex-col h-[600px] p-0 overflow-hidden">
      {/* Header & Search */}
      <div className="p-3.5 border-b border-surface-border space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-900">Dispatch Communications</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
            {conversations.length} Threads
          </span>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search operator, driver, hub..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-surface-muted border border-surface-border text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Conversation Thread List */}
      <div className="flex-1 overflow-y-auto divide-y divide-surface-border">
        {filtered.map((c) => {
          const isActive = c.id === activeId;

          return (
            <div
              key={c.id}
              onClick={() => onSelectConversation(c.id)}
              className={`p-3.5 cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                isActive ? 'bg-brand-50/60 border-l-4 border-brand-500' : 'hover:bg-surface-muted/60'
              }`}
            >
              {/* Avatar with Online Dot */}
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-ink-700 font-bold text-xs border border-surface-border">
                  {c.avatarInitials}
                </div>
                {c.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              {/* Thread Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-ink-900 truncate">{c.participantName}</h4>
                  <span className="text-[10px] text-ink-400 shrink-0">{c.lastTimestamp}</span>
                </div>

                <p className="text-[11px] text-ink-500 truncate">{c.participantDetail}</p>

                <p className="text-xs text-ink-700 truncate mt-1">{c.lastMessage}</p>
              </div>

              {/* Unread badge */}
              {c.unreadCount > 0 && (
                <span className="shrink-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-[10px]">
                  {c.unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
