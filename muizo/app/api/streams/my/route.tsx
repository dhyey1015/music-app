import { prismaClient } from "@/app/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {  } from "@/app/api/auth/[...nextauth]/route";





export async function  GET(req: NextRequest){
    const session = await getServerSession(authOptions);
    //TODO: you can get rid of the extra db call here
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
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: user.id
        },
        include: {
            _count:{
                select:{
                    upVotes: true
                }
            }
        }
    });

    return NextResponse.json({
        streams
    });

}