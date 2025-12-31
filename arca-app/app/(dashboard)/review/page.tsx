"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import AskBar from "@/components/chat/AskBar"
import ChatArea from "@/components/chat/ChatArea"
import RapidFire from "@/components/review/RapidFire"
import KeyConcepts from "@/components/review/KeyConcepts"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type Chat = {
  id: string
  messages: ChatMessage[]
}

export default function ReviewPage() {
  const [chats, setChats] = useState<Chat[]>([
    { id: crypto.randomUUID(), messages: [] },
  ])
  const [activeChatId, setActiveChatId] = useState(chats[0].id)
  const [message, setMessage] = useState("")

  const activeChat = chats.find((c) => c.id === activeChatId)!

  const handleSend = () => {
    const trimmed = message.trim()
    if (!trimmed) return

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "user", content: trimmed },
                {
                  role: "assistant",
                  content:
                    "Hey! This is the beta version for now. Proper AI responses are coming soon 👀",
                },
              ],
            }
          : chat
      )
    )

    setMessage("")
  }

  const handleNewChat = () => {
    const id = crypto.randomUUID()
    setChats((prev) => [...prev, { id, messages: [] }])
    setActiveChatId(id)
    setMessage("")
  }

  return (
    <div className="flex h-screen bg-[#020617]">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />

      <main className="flex flex-col flex-1 min-w-0">
        <TopBar />

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeChat.messages.length === 0 ? (
            <>
              <RapidFire />
              <KeyConcepts />
            </>
          ) : (
            <ChatArea chat={activeChat.messages} />
          )}
        </div>

        <AskBar
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
        />
      </main>
    </div>
  )
}
