import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { NeoButton } from "@/components/ui/neo-button";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-white p-8 pt-12 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-12">
            <Link href="/" className="text-2xl font-jakarta font-black text-white tracking-tighter">
                Planova
            </Link>
            <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}>
                <NeoButton type="submit" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 px-6 py-2 rounded-lg font-bold">
                    Sign Out
                </NeoButton>
            </form>
        </div>
        
        <h1 className="text-4xl font-black font-jakarta tracking-tight">Dashboard</h1>

        <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-[#1d1f29] rounded-2xl border-2 border-white/10 shadow-neo">
          {session.user.image ? (
            <Image 
              src={session.user.image} 
              alt={session.user.name || "User Photo"} 
              width={96} 
              height={96} 
              className="rounded-full border-4 border-primary/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/5 border-4 border-primary/20 flex items-center justify-center text-3xl font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold font-jakarta text-white">{session.user.name}</h2>
            <p className="text-zinc-400 text-lg">{session.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
