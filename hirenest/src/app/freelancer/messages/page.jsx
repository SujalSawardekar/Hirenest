import { ChatInterface } from "@/components/chat/ChatInterface"

export default function FreelancerMessagesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Messages</h1>
                <p className="text-muted-foreground">Collaborate with your clients and provide real-time updates.</p>
            </div>

            <ChatInterface />
        </div>
    )
}
