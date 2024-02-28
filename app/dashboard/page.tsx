import Stats from '@/components/stats'
import { auth, clerkClient } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const user = await clerkClient.users.getUser(userId)

  return (
    <div className="px-5 py-12 sm:py-16 md:px-20 flex flex-col gap-5">
      {user && (
        <>
          <h1 className="text-3xl font-semibold text-black">
            👋 Hi, {user.firstName || `Stranger`}
          </h1>
          <Stats />
        </>
      )}
    </div>
  )
}
