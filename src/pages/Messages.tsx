import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { seedConversations, type ChatConversation, type ChatMessage } from '@/data/messages';
import { ChatConversationList } from '@/components/messages/ChatConversationList';
import { ChatWindow } from '@/components/messages/ChatWindow';

export function MessagesPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(seedConversations);
  const [activeId, setActiveId] = useState<string>(seedConversations[0].id);

  const activeConversation = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: 'Central Dispatch',
      senderRole: 'Dispatcher',
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            unreadCount: 0,
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Dispatch Messages']}
      pageTitle="Dispatch Communications"
      mobileTitle="Messages"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-4">
          <ChatConversationList
            conversations={conversations}
            activeId={activeId}
            onSelectConversation={setActiveId}
          />
        </div>

        <div className="lg:col-span-8">
          <ChatWindow
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
