"use client"

import { useState } from "react"
import { Send, Paperclip, MoreVertical, Search, Check, CheckCheck } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const mockConversations = [
    { id: 1, name: "Sarah Jenkins", role: "Client", lastMessage: "Yes, that logo variation looks perfect!", time: "10:42 AM", unread: 0, online: true, avatar: "SJ", color: "bg-blue-500" },
    { id: 2, name: "GlobalTech Inc.", role: "Client", lastMessage: "Can we hop on a quick call?", time: "Yesterday", unread: 2, online: false, avatar: "GT", color: "bg-purple-500" },
    { id: 3, name: "David Chen", role: "Freelancer", lastMessage: "The smart contract is deployed on testnet.", time: "Mon", unread: 0, online: true, avatar: "DC", color: "bg-green-500" },
]

const mockChatHistory = [
    { id: 1, sender: "Sarah Jenkins", text: "Hi Alex! How is the branding coming along?", time: "09:15 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hey Sarah! It's going great. I've finished the first three logo concepts.", time: "09:30 AM", isMe: true },
    { id: 3, sender: "Me", text: "I'll upload them here in a minute.", time: "09:31 AM", isMe: true },
    { id: 4, sender: "Sarah Jenkins", text: "Awesome! Looking forward to reviewing them.", time: "09:45 AM", isMe: false },
    { id: 5, sender: "Me", text: "Here is the PDF with the variations.", time: "10:15 AM", isMe: true, isAttachment: true, filename: "logo-concepts-v1.pdf" },
    { id: 6, sender: "Sarah Jenkins", text: "Got it! Reviewing now...", time: "10:30 AM", isMe: false },
    { id: 7, sender: "Sarah Jenkins", text: "Yes, that logo variation looks perfect!", time: "10:42 AM", isMe: false },
]

export function ChatInterface() {
    const [activeChat, setActiveChat] = useState(mockConversations[0])
    const [messageText, setMessageText] = useState("")

    return (
        <div className="flex h-[calc(100vh-140px)] border border-white/10 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
            {/* Sidebar - Conversations List */}
            <div className="w-1/3 border-r border-white/10 flex flex-col bg-background/30">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-9 bg-background/50 border-white/10 text-sm h-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {mockConversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex items-start gap-3 ${activeChat.id === chat.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${chat.color}`}>
                                    {chat.avatar}
                                </div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`font-medium ${activeChat.id === chat.id ? 'text-white' : 'text-foreground'} truncate opacity-90`}>{chat.name}</h3>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-muted-foreground'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-background/10">
                {/* Chat Header */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-card/30">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${activeChat.color}`}>
                            {activeChat.avatar}
                        </div>
                        <div>
                            <h2 className="font-semibold text-white">{activeChat.name}</h2>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {activeChat.online ? <><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</> : 'Offline'}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <MoreVertical className="w-5 h-5" />
                    </Button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="text-center">
                        <span className="text-xs bg-card px-3 py-1 rounded-full text-muted-foreground">Today</span>
                    </div>
                    {mockChatHistory.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">{msg.isMe ? 'You' : msg.sender}</span>
                                <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                            </div>

                            {msg.isAttachment ? (
                                <div className={`p-3 rounded-2xl flex items-center gap-3 max-w-[80%] ${msg.isMe ? 'bg-primary/20 text-primary border border-primary/30 rounded-tr-sm' : 'bg-card text-foreground rounded-tl-sm'}`}>
                                    <div className="w-10 h-10 bg-background/50 rounded flex items-center justify-center">
                                        <Paperclip className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium truncate">{msg.filename}</p>
                                        <p className="text-xs opacity-70">2.4 MB • PDF</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-sm ${msg.isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-card text-foreground border border-white/5 rounded-tl-sm'}`}>
                                    {msg.text}
                                </div>
                            )}
                            {msg.isMe && (
                                <div className="mt-1 text-primary">
                                    <CheckCheck className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-card/30 border-t border-white/10">
                    <form
                        className="flex items-end gap-2"
                        onSubmit={(e) => { e.preventDefault(); setMessageText(""); }}
                    >
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground shrink-0 mb-1">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <div className="flex-1 min-h-[44px] bg-background/50 border border-white/10 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                            <textarea
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none resize-none max-h-32"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        setMessageText("");
                                    }
                                }}
                            />
                        </div>
                        <Button type="submit" size="icon" className="bg-primary text-white hover:bg-primary/90 shrink-0 mb-1 rounded-xl h-11 w-11" disabled={!messageText.trim()}>
                            <Send className="w-5 h-5 ml-0.5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
