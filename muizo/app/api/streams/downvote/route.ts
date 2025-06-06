import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import z from "zod"

const DownVoteSchema = z.object({
    streamId : z.string()
})

export async function POST(req: NextRequest) {

    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    }) 
    
    if(!user){
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        })
    }

    try{
        const data = DownVoteSchema.parse(await req.json());

        await prismaClient.upVotes.delete({
            where:{
                userId_streamId:{
                    userId: user.id,
                    streamId: data.streamId
                }
            }
        })
        return NextResponse.json({
            message: "down vote successfully"
        })

    } catch (e) {
        return NextResponse.json({
            message: "Error while down voting"
        }, {
            status: 400
        })
    }
}