import React from "react"
import { ArrowUp } from "lucide-react"

type Props = {
  message: string
  setMessage: (v: string) => void
  onSend: () => void
}

export default function AskBar({ message, setMessage, onSend }: Props) {
  const disabled = !message.trim()

  return (
    <div className="px-6 py-4">
      <div className="py-3.5 px-[18px] rounded-full bg-slate-900/85 border border-slate-400/18 flex gap-3 items-center">
        <input
          className="flex-1 bg-transparent border-none text-gray-200 text-sm placeholder:text-gray-400 focus:outline-none"
          placeholder="Ask Arca AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) onSend()
          }}
        />

        <button
          onClick={onSend}
          disabled={disabled}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
