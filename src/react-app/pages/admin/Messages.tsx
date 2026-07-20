import { Clock, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useState } from "react";
import { useAdminContact, useMarkMessageRead } from "../../hooks/useQueries";

export default function Messages() {
  const { data: messages = [], isLoading } = useAdminContact();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const markReadMutation = useMarkMessageRead();

  const markRead = (id: string) => {
    markReadMutation.mutate(id);
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold text-brand-text mb-6">
          Contact Messages
        </h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-border animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-12 bg-gray-200 rounded-full" />
                </div>
                <div className="h-4 w-40 bg-gray-100 rounded" />
                <div className="h-16 w-full bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-text">
            Contact Messages
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {messages.length} total {messages.length === 1 ? "message" : "messages"}
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 bg-brand-green/10 text-brand-green px-3 py-1.5 rounded-full text-sm font-medium">
            <span className="h-2 w-2 bg-brand-green rounded-full animate-pulse" />
            {unreadCount} unread
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-brand-green" size={28} />
          </div>
          <h3 className="font-heading font-bold text-brand-text text-lg mb-2">
            No messages yet
          </h3>
          <p className="text-sm text-brand-muted max-w-sm mx-auto">
            Contact form submissions from your website will appear here. Mark
            them as read once you've reviewed them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                m.read
                  ? "bg-white border-border hover:shadow-sm"
                  : "bg-brand-green/5 border-brand-green/20 hover:shadow-md"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          m.read ? "bg-gray-100" : "bg-brand-green/10"
                        }`}
                      >
                        <User
                          size={18}
                          className={
                            m.read ? "text-brand-muted" : "text-brand-green"
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-heading font-bold text-brand-text ${
                              !m.read ? "text-base" : "text-sm"
                            }`}
                          >
                            {m.name}
                          </h3>
                          {!m.read && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-green text-white px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-brand-muted mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail size={12} className="text-brand-muted/60" />
                            {m.email}
                          </span>
                          {m.phone && (
                            <span className="flex items-center gap-1">
                              <Phone
                                size={12}
                                className="text-brand-muted/60"
                              />
                              {m.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-3 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        m.read
                          ? "bg-gray-50 hover:bg-gray-100"
                          : "bg-white border border-brand-green/10 hover:border-brand-green/20"
                      }`}
                      onClick={() =>
                        setExpandedId(expandedId === m.id ? null : m.id)
                      }
                    >
                      <p
                        className={`text-sm text-brand-text leading-relaxed ${
                          expandedId !== m.id && !m.read
                            ? "line-clamp-2"
                            : ""
                        }`}
                      >
                        {m.message}
                      </p>
                      {m.message.length > 100 && expandedId !== m.id && (
                        <button
                          className="text-xs text-brand-green font-medium mt-2 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(m.id);
                          }}
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  </div>

                  {!m.read && (
                    <button
                      onClick={() => markRead(m.id)}
                      disabled={markReadMutation.isPending}
                      className="shrink-0 text-xs bg-white text-brand-green px-4 py-2 rounded-xl font-semibold border border-brand-green/30 hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50"
                    >
                      {markReadMutation.isPending ? "..." : "Mark Read"}
                    </button>
                  )}
                </div>
              </div>

              <div className="px-5 py-2.5 bg-gray-50/50 border-t border-border/50">
                <p className="text-xs text-brand-muted flex items-center gap-1.5">
                  <Clock size={12} />
                  Received {formatRelativeTime(m.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
