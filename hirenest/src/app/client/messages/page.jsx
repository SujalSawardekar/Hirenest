import { ChatInterface } from "@/components/chat/ChatInterface"

export default function ClientMessagesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Messages</h1>
                <p className="text-muted-foreground">Communicate with your freelancers and share project files securely.</p>
            </div>

            <ChatInterface />
        </div>
    )
}
