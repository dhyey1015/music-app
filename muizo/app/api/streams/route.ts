
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';
import { prismaClient } from "@/app/lib/db";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const CreateStreamSchema = z.object({
    createrId: z.string(),
    // url: z.string().refine((url) =>
    //     url.includes("youtube.com"), //|| url.includes("spotify.com"), // TODO add this too
    //     {
    //         message: "URL must be from YouTube or Spotify",
    //     }
    // )
    url: z.string()
})

export async function POST(req: NextRequest){
    try {
        // TODO: add rate limiting 
        // We are assuming that incomming url is a youtube url
        const data = CreateStreamSchema.parse(await req.json());

        // yt url check
        const isYt = data.url.match(YT_REGEX);
        if (!isYt){
            return NextResponse.json({
                message: "Wrong URL format"
            },{
                status: 411
            });
        }
        const extractedId = data.url.split("?v=")[1];

        //fetching yt video things like thumbnail and title of vidoe
        const res  = await youtubesearchapi.GetVideoDetails(extractedId);
        const thumbnails = res.thumbnail.thumbnails;
        
        //this line sorts the elements in lower to higher order
        thumbnails.sort((a : {width: number}, b : {width: number}) => a.width < b.width ? -1 : 1);


        const newStream = await prismaClient.stream.create({
            data:{
                userId: data.createrId,
                url: data.url,
                extractedId: extractedId,
                type: "Youtube",
                title: res.title ?? "Can't find video",
                bigImg: thumbnails[thumbnails.length - 1] ?? "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2] : thumbnails[thumbnails.length - 1]) ?? "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg" 
            }
        });
        return NextResponse.json({
            message: "Stream created succeccfully",
            id: newStream.id
        });

    } catch (e) {
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        });
    }
}


export async function GET(req:NextRequest) {
    const createrId = req.nextUrl.searchParams.get("createrId")
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: createrId ?? ""
        }
    });

    return NextResponse.json({
        streams
    });
}