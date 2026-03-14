import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { SettingsForm } from "./SettingsForm"

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/login")
    }

    const userId = session.user.id
    const userRole = session.user.role

    const userData = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!userData) {
        redirect("/login")
    }

    // Determine the user's dashboard link to place the Back arrow
    const dashboardLink = userRole === "FREELANCER" ? "/freelancer" : userRole === "ADMIN" ? "/admin" : "/client"

    return <SettingsForm userData={userData} userRole={userRole} dashboardLink={dashboardLink} />
}
