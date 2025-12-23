"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Xin chào 👋 Tôi là Food Dev Bot. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      setLoading(true);

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "Xin lỗi, tôi chưa hiểu 😥" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Hệ thống đang bận, vui lòng thử lại sau 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-10 left-6 w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 z-50"
      >
        <FaRobot size={22} />
      </button>

      {/* Chatbox */}
      {open && (
        <div className="max-h-[70vh] fixed bottom-24 left-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-orange-500 text-white rounded-t-2xl">
            <div className="flex items-center gap-2 font-semibold">
              <FaRobot />
              Food Dev Bot
            </div>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-white text-gray-700 rounded-bl-none shadow"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-gray-400">Bot đang trả lời...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-300 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
