
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import { prismaClient } from "@/app/lib/db";

const CreateStreamSchema = z.object({
    createrId: z.string(),
    url: z.string().refine((url) =>
        url.includes("youtube.com"), //|| url.includes("spotify.com"), // TODO add this too
        {
            message: "URL must be from YouTube or Spotify",
        }
    )
})



export async function POST(req: NextRequest){
    try {
        // TODO: add rate limiting 
        // We are assuming that incomming url is a youtube url
        const parsedData = CreateStreamSchema.parse(await req.json())
        prismaClient.stream.create({
            userId: parsedData.createrId,

        })
    } catch {
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        })
    }
}