"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function AppBar(){
    const session = useSession();
    return(
        <div className="flex justify-between">
            <div >
                Muizo
            </div>
            <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>Logout</button>}
                {!session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>Sign in</button>}  
            </div>
        </div>
    );
}