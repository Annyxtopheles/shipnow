import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Send, Phone, CheckCheck } from 'lucide-react';
import type { ChatConversation, ChatMessage } from '@/data/messages';

interface ChatWindowProps {
  conversation: ChatConversation;
  onSendMessage: (text: string) => void;
}

export function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickTemplate = (text: string) => {
    onSendMessage(text);
  };

  return (
    <Card className="flex flex-col h-[600px] p-0 overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-surface-border flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xs">
              {conversation.avatarInitials}
            </div>
            {conversation.online && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-ink-900">{conversation.participantName}</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-muted text-ink-600 border border-surface-border">
                {conversation.participantRole}
              </span>
            </div>
            <p className="text-xs text-ink-500">{conversation.participantDetail}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-surface-border text-ink-700 hover:bg-surface-muted transition"
            title="Direct Radio Link"
          >
            <Phone size={13} />
            <span className="hidden sm:inline">Call Radio</span>
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-muted/30">
        <div className="text-center">
          <span className="text-[10px] font-medium text-ink-400 bg-white px-2.5 py-1 rounded-full border border-surface-border shadow-2xs">
            Encrypted Dispatch Channel Active
          </span>
        </div>

        {conversation.messages.map((m: ChatMessage) => {
          return (
            <div
              key={m.id}
              className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-ink-400">
                <span className="font-semibold text-ink-600">{m.senderName}</span>
                <span>·</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`max-w-[80%] sm:max-w-[70%] p-3.5 text-xs shadow-2xs ${
                  m.isSelf
                    ? 'bg-brand-500 text-white rounded-2xl rounded-tr-xs'
                    : 'bg-white text-ink-900 border border-surface-border rounded-2xl rounded-tl-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>

              {m.isSelf && (
                <div className="flex items-center gap-1 text-[10px] text-brand-600 font-medium mt-0.5 px-1">
                  <CheckCheck size={12} />
                  <span>Delivered to cab terminal</span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Status Shortcuts & Input Composer */}
      <div className="p-3 border-t border-surface-border bg-white space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          <span className="text-[11px] font-semibold text-ink-400 shrink-0">Quick Dispatch:</span>
          <button
            type="button"
            onClick={() => handleQuickTemplate('ETA confirmed on dispatch board.')}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-muted hover:bg-surface-border text-ink-700 whitespace-nowrap transition"
          >
            ETA Confirmed
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('Dock Bay 4 assigned for arrival.')}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-muted hover:bg-surface-border text-ink-700 whitespace-nowrap transition"
          >
            Dock Assigned
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('Clearance documents uploaded to your tablet.')}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-muted hover:bg-surface-border text-ink-700 whitespace-nowrap transition"
          >
            Clearance Sent
          </button>
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type dispatch message or operational update..."
            className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-surface-muted border border-surface-border text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:bg-white"
          />
          <Button
            type="submit"
            className="!px-4 !py-2.5 text-xs flex items-center gap-1.5"
            disabled={!inputText.trim()}
          >
            <Send size={13} />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
