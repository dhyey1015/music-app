
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';

const CreateStreamSchema = z.object({
    createrId: z.string(),
    url: z.string().refine((url) =>
        url.includes("youtube.com") || url.includes("spotify.com"),
        {
            message: "URL must be from YouTube or Spotify",
        }
    )
})



export async function POST(req: NextRequest){
    try {
        const parsedData = CreateStreamSchema.parse(await req.json())
    } catch {
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        })
    }
}