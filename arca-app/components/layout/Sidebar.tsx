import React from "react"
import { Plus } from "lucide-react"
import type { ChatMessage } from "@/app/(dashboard)/review/page"

type Chat = {
  id: string
  messages: ChatMessage[]
}

type SidebarProps = {
  chats: Chat[]
  activeChatId: string
  onSelectChat: (id: string) => void
  onNewChat: () => void
}

const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) => {
  return (
    <aside className="w-[260px] min-h-screen py-7 px-6 flex flex-col bg-[#020617] border-r border-slate-400/15">
      
      {/* Branding */}
      <div>
        <h2 className="text-[26px] font-bold -tracking-[0.5px] text-gray-50">
          Arca
        </h2>
        <p className="text-sm text-gray-400 mt-1">Beta</p>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="mt-5 flex items-center gap-2 px-3.5 py-2 rounded-full
                   bg-indigo-500/12 border border-indigo-500/35
                   text-indigo-200 text-[13px] font-medium w-fit
                   hover:bg-indigo-500/20 transition"
      >
        <Plus size={14} />
        New chat
      </button>

      {/* Chat List */}
      <div className="mt-6 flex-1 overflow-y-auto">
        <p className="text-xs text-gray-400 mb-2">Chats</p>

        <ul className="space-y-1">
          {chats.map((chat) => {
            const firstUserMessage = chat.messages.find(
              (m) => m.role === "user"
            )

            const title =
              firstUserMessage?.content.slice(0, 28) || "New chat"

            const isActive = chat.id === activeChatId

            return (
              <li key={chat.id}>
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={[
                    "w-full text-left px-3 py-2 rounded-lg text-xs truncate transition",
                    isActive
                      ? "bg-slate-700/60 text-gray-50 ring-1 ring-indigo-500/40"
                      : "bg-slate-800/40 text-gray-300 hover:bg-slate-700/50",
                  ].join(" ")}
                  title={title}
                >
                  {title}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <p className="text-xs text-gray-400 mb-2">Beta plan</p>
        <button
          className="w-full py-3 rounded-full bg-indigo-500
                     text-white font-semibold border-none cursor-pointer
                     shadow-[0_8px_20px_rgba(99,102,241,0.35)]
                     hover:brightness-105 transition"
        >
          Upload
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
