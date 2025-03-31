import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// Upvotes will on need stream id because it only have to know that this stream got up vote
const UpvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(req: NextRequest){
    const session = await getServerSession(); // to get user data availabe on session (session starts when user logs in)
    
    //TODO: replace this email with id. don't use email (by default nextauth gives you email not id )
    //TOD: can get rid of db call here
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    }) 

    if(!user){
        return NextResponse.json({
            message: "Unauthenticated"
        },{
            status: 403
        })
    }

    try {
        const data = UpvoteSchema.parse(await req.json())
        await prismaClient.upVotes.create({
            data:{
                userId: user.id, 
                streamId: data.streamId
            }
        })

    } catch(e) {
        return NextResponse.json({
            message: "Erro while up voting"
        },{
            status: 400
        })
    }

    


    const parsedData = UpvoteSchema.parse(await req.json());
}