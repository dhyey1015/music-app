"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Music } from "lucide-react";


export function AppBar(){
    const session = useSession();
    return(
        <div className="flex justify-between">
            <Link href={"#"} className="flex item-center justify-center">
                <Music className="h-6 w-6 text-purple-400" />
                <span className="ml-2 text-lg font-bold text-purple-400">Muizo</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href={"#"} className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                    Features
                </Link>
                <Link href={"#"} className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                    Pricing
                </Link>
                <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>Logout</button>}
                {!session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>Sign in</button>}  
            </div>
            </nav>
            
        </div>
    );
}