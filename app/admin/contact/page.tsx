// app/admin/contact/page.tsx
"use client";
import { useState, useEffect } from "react";
import { getContactMessages, replyToMessage, deleteContactMessage, ContactMessage } from "@/lib/actions/contact";
import { Mail, Reply, Trash2, CheckCircle, Clock, Loader2, X, Send } from "lucide-react";

export default function ContactAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const data = await getContactMessages();
    setMessages(data);
    setLoading(false);
  };

  const handleReply = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyText("");
  };

const sendReply = async () => {
  if (!selectedMessage || !replyText.trim()) return;
  
  setReplying(true);
  const result = await replyToMessage(selectedMessage.id, replyText);
  
  if (result.success) {
    await loadMessages();
    setSelectedMessage(null);
    setReplyText("");
    alert(result.emailSent ? "Reply sent and email delivered!" : "Reply saved but email failed to send.");
  } else {
    alert(result.error || "Failed to send reply");
  }
  setReplying(false);
};

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    setDeleting(id);
    const result = await deleteContactMessage(id);
    
    if (result.success) {
      await loadMessages();
    } else {
      alert("Failed to delete message");
    }
    setDeleting(null);
  };

  const getStatusBadge = (status: string) => {
    if (status === "replied") {
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold" 
              style={{ background: "rgba(45,138,78,0.1)", color: "#2d8a4e", border: "1px solid rgba(45,138,78,0.3)" }}>
          <CheckCircle size={10} /> Replied
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
        <Clock size={10} /> Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin" size={32} style={{ color: "#C9A84C" }} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Mail size={24} style={{ color: "#C9A84C" }} />
          <h1 className="text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
            Contact Messages
          </h1>
        </div>
        <p className="text-sm" style={{ color: "#a89070" }}>Manage and reply to customer inquiries</p>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {messages.length === 0 ? (
          <div className="col-span-full text-center py-12" style={{ color: "#a89070" }}>
            No messages yet
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl p-5 transition-all hover:shadow-lg"
              style={{
                background: "#fff",
                border: `1px solid ${msg.status === "replied" ? "rgba(45,138,78,0.2)" : "rgba(201,168,76,0.2)"}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black" style={{ color: "#1a0a00" }}>{msg.name}</h3>
                    {getStatusBadge(msg.status)}
                  </div>
                  <p className="text-xs" style={{ color: "#a89070" }}>{msg.email}</p>
                  <p className="text-[10px] mt-1" style={{ color: "#c9b28b" }}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Recently"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReply(msg)}
                    className="p-2 rounded-lg transition-all hover:scale-105"
                    style={{ background: "rgba(201,168,76,0.1)" }}
                    title="Reply"
                  >
                    <Reply size={14} style={{ color: "#C9A84C" }} />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deleting === msg.id}
                    className="p-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                    style={{ background: "rgba(201,68,68,0.1)" }}
                    title="Delete"
                  >
                    {deleting === msg.id ? (
                      <Loader2 size={14} className="animate-spin" style={{ color: "#c94444" }} />
                    ) : (
                      <Trash2 size={14} style={{ color: "#c94444" }} />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="mt-3 p-3 rounded-xl" style={{ background: "#f8f5f0" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#5a3e1a" }}>{msg.message}</p>
              </div>
              
              {msg.reply && (
                <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(201,168,76,0.05)", borderLeft: "3px solid #C9A84C" }}>
                  <p className="text-[10px] font-bold uppercase mb-1" style={{ color: "#8B6914" }}>Your Reply:</p>
                  <p className="text-sm" style={{ color: "#5a3e1a" }}>{msg.reply}</p>
                  {msg.repliedAt && (
                    <p className="text-[10px] mt-1" style={{ color: "#a89070" }}>
                      Replied: {new Date(msg.repliedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMessage(null)}>
          <div className="max-w-lg w-full rounded-2xl p-6" style={{ background: "#fff", border: "2px solid #C9A84C" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
                Reply to {selectedMessage.name}
              </h3>
              <button onClick={() => setSelectedMessage(null)} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4 p-3 rounded-xl" style={{ background: "#f8f5f0" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#8B6914" }}>Original Message:</p>
              <p className="text-sm" style={{ color: "#5a3e1a" }}>{selectedMessage.message}</p>
            </div>
            
            <textarea
              rows={5}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
              style={{
                background: "#f8f5f0",
                color: "#5a3e1a",
                border: "1.5px solid rgba(201,168,76,0.3)",
                fontFamily: "Georgia, serif",
              }}
              onFocus={(e) => e.target.style.border = "1.5px solid #C9A84C"}
              onBlur={(e) => e.target.style.border = "1.5px solid rgba(201,168,76,0.3)"}
            />
            
            <button
              onClick={sendReply}
              disabled={replying || !replyText.trim()}
              className="w-full py-3 rounded-xl text-xs font-black tracking-[0.2em] uppercase transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #1a0f00, #0d0800)",
                border: "1.5px solid #C9A84C",
                color: "#C9A84C",
              }}
            >
              {replying ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}