"use client"
import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";


export function AppBar(){
    const session = useSession();
    return(
        <div>
            {session.data?.user && <Button variant={"outline"} className="text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-gray-900" onClick={() => signOut()}>Logout</Button>}
            {!session.data?.user && <Button variant={"outline"} className="text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-gray-900" onClick={() => signIn()}>Sign in</Button>}  
        </div>
    );
}