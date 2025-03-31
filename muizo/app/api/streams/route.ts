
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import { prismaClient } from "@/app/lib/db";

const YT_REGEX = new RegExp ("^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(&t=\d+s)?$")
;
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
        const parsedData = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(parsedData.url);
        if (!isYt){
            return NextResponse.json({
                message: "Wrong URL format"
            },{
                status: 411
            })
        }
        const extractedId = parsedData.url.split("?v=")[1];

        await prismaClient.stream.create({
            data:{
                userId: parsedData.createrId,
                url: parsedData.url,
                extractedId: extractedId,
                type: "Youtube"
            }
        })
    } catch (e) {
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        })
    }
}


export async function GET(req:NextRequest) {
    const createrId = req.nextUrl.searchParams.get("createrId")
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: createrId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}