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
        const reqData = await req.json()
        const data = UpvoteSchema.parse(reqData)
        await prismaClient.upVotes.create({
            data:{
                userId: user.id, 
                streamId: data.streamId
            }
        })
        return NextResponse.json({
            message: "up vote successfully"
        })

    } catch(e) {
        return NextResponse.json({
            message: "Error while up voting"
        },{
            status: 400
        })
    }

    const parsedData = UpvoteSchema.parse(await req.json());
}