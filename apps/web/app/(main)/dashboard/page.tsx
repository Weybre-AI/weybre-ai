"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { Plus, ArrowUp, Square } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type Message = {
  id: string
  role: "user" | "ai"
  content: string
}

export default function Dashboard() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const hasMessages = messages.length > 0

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Listen for the global new-chat event dispatched from the Sidebar
  React.useEffect(() => {
    const onNewChat = () => {
      setMessages([])
      setInput("")
      setIsGenerating(false)
    }

    window.addEventListener("new-chat", onNewChat)
    return () => window.removeEventListener("new-chat", onNewChat)
  }, [])

  const handleSend = () => {
    if (!input.trim() || isGenerating) return

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: "user", 
      content: input.trim() 
    }
    
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsGenerating(true)

    // Simulate AI response stream
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          role: "ai", 
          content: "This is a simulated AI response. Your dashboard UI successfully transformed from a centered search prompt into an active conversational state without leaving the page. You can integrate your actual API to stream responses here." 
        }
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleReset = () => {
    setMessages([])
    setInput("")
    setIsGenerating(false)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative w-full bg-background transition-colors duration-300">
      
      {!hasMessages ? (
        // Initial Centered State
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
          <h1 className="text-3xl font-semibold mb-4 text-foreground tracking-tight">
            What can I help with?
          </h1>
          <div className="w-full max-w-3xl">
            <SearchInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              isGenerating={isGenerating}
              textareaRef={textareaRef}
            />
          </div>
        </div>
      ) : (
        // Active Conversational State
        <>
          <div className="flex-1 overflow-y-auto px-4 pt-6">
            <div className="mx-auto w-full max-w-3xl flex flex-col gap-6 pb-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col gap-1.5", 
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-5 py-3.5 rounded-3xl whitespace-pre-wrap text-[15px] leading-relaxed",
                      msg.role === "user" 
                        ? "bg-muted max-w-[75%] rounded-br-md text-foreground" 
                        : "bg-transparent w-full text-foreground"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex flex-col items-start gap-1.5 animate-pulse">
                  <div className="px-5 py-3.5 bg-transparent w-full text-foreground text-[15px]">
                    <span className="inline-block h-2 w-2 bg-foreground rounded-full mr-1" />
                    <span className="inline-block h-2 w-2 bg-foreground rounded-full mr-1 opacity-70" />
                    <span className="inline-block h-2 w-2 bg-foreground rounded-full opacity-40" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
          
          {/* Bottom Fixed Input */}
          <div className="shrink-0 w-full bg-background pb-6 pt-2 px-4">
            <div className="mx-auto w-full max-w-3xl animate-in slide-in-from-bottom-4 fade-in duration-500">
              <SearchInput
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                handleKeyDown={handleKeyDown}
                isGenerating={isGenerating}
                textareaRef={textareaRef}
              />
              <p className="text-center text-xs text-muted-foreground mt-3">
                AI can make mistakes. Consider verifying important information.
              </p>
            </div>
          </div>
        </>
      )}
      
    </div>
  )
}

function SearchInput({ 
  input, 
  setInput, 
  handleSend, 
  handleKeyDown, 
  isGenerating, 
  textareaRef 
}: any) {
  return (
    <div className="relative flex items-end bg-muted/50 hover:bg-muted/70 rounded-3xl border border-border shadow-sm p-2 transition-colors duration-200 focus-within:bg-muted/70 focus-within:ring-1 focus-within:ring-ring">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-10 w-10 rounded-full shrink-0 text-muted-foreground hover:text-foreground hover:bg-background/50 mb-0.5"
      >
        <Plus className="h-5 w-5" />
      </Button>
      
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything"
        className="flex-1 max-h-[40vh] min-h-[44px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-3 text-base shadow-none !field-sizing-content"
        rows={1}
      />
      
      <Button
        onClick={isGenerating ? () => {} : handleSend}
        disabled={!input.trim() && !isGenerating}
        variant={input.trim() ? "default" : "secondary"}
        size="icon"
        className={cn(
          "h-10 w-10 rounded-full shrink-0 ml-2 mb-0.5 transition-all duration-200",
          !input.trim() && !isGenerating && "opacity-50"
        )}
      >
        {isGenerating ? (
          <Square className="h-4 w-4 fill-current" />
        ) : (
          <ArrowUp className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}
