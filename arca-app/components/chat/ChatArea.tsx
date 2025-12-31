// components/chat/ChatArea.tsx
import React, { useEffect, useRef } from "react"
import type { ChatMessage } from "@/app/(dashboard)/review/page"

type Props = {
  chat: ChatMessage[]
}

const ChatArea = ({ chat }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat.length])

  // Empty state
  if (chat.length === 0) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <p className="text-sm text-gray-400 text-center max-w-sm">
          Ask something to get started.  
          This is the beta version, so responses will be basic for now.
        </p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      <div className="flex flex-col gap-3">
        {chat.map((msg, idx) => {
          const isUser = msg.role === "user"

          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={[
                  "max-w-[68%]",
                  "px-4 py-2.5",
                  "rounded-2xl",
                  "text-sm leading-relaxed",
                  isUser
                    ? "bg-indigo-500 text-white rounded-br-md"
                    : "bg-slate-800 text-gray-100 rounded-bl-md",
                ].join(" ")}
              >
                {msg.content}
              </div>
            </div>
          )
        })}

        {/* scroll anchor */}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ChatArea
