"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, Play, Share2} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
// import axios from "axios";

const REFRESH_INTERVAL_MS = 10 * 1000;

type Song = {
  id: number;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  isActive: boolean;
  userId: string;
  upVotes: number;
  thumbnailUrl: string;
  haveUpvoted: boolean;
};

export default function SongVotingQueue() {
  const session = useSession();
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);


  useEffect(() => {
    refreshStreams()
    const interval = setInterval(() => {
      refreshStreams();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  async function refreshStreams() {
    try {
      const res = await fetch(`/api/streams/my`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Failed to fetch streams");
        return;
      }

      const data = await res.json();

      const songs: Song[] = data.streams
      .sort((a: any, b: any) => (b.upvotes || 0) - (a.upvotes || 0))
      .map((stream: any) => ({
        id: stream.id,
        type: stream.type,
        url: stream.url,
        extractedId: stream.extractedId,
        title: stream.title,
        smallImg: stream.smallImg,
        bigImg: stream.bigImg,
        isActive: stream.isActive,
        userId : stream.userId,
        upVotes : stream.upvotes || 0,
        thumbnailUrl: stream.smallImg,
        haveUpvoted : stream.haveUpvoted
      }));
      
      setQueue(songs);
    } catch (error) {
      console.error(`Error fetching streams: ${error}`);
    }
  }

 

  const handleVote = async (streamId: number, isUpVoted: boolean) =>  {

    // setQueue((prev) =>
    //   [...prev]
    //     .map((song) =>
    //       song.id === streamId
    //         ? {
    //             ...song,
    //             upVotes: isUpVoted? song.upVotes + 1 : song.upVotes
    //           }
    //         : song
    //     ).sort((a, b) => (b.upVotes) - (a.upVotes))
    // );

    const endpoint = isUpVoted ? "/api/streams/upvote" : "/api/streams/downvote";
 
      await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          streamId: streamId
        })
      })

      await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          streamId: streamId
        })
      })
    
    refreshStreams()

  };

  // const handleShare = () => {
  //   const shareableLink = window.location.href;
  //   navigator.clipboard
  //     .writeText(shareableLink)
  //     .then(() => {
  //       toast.success("🔗 Link copied to clipboard!", {
  //         style: {
  //           background: "#1f2937",
  //           color: "#fff",
  //           border: "1px solid #9333ea",
  //           padding: "12px 16px",
  //           borderRadius: "8px",
  //         },
  //       });
  //     })
  //     .catch(() => {
  //       toast.error("❌ Failed to copy link.", {
  //         style: {
  //           background: "#1f2937",
  //           color: "#fff",
  //           border: "1px solid #ef4444",
  //           padding: "12px 16px",
  //           borderRadius: "8px",
  //         },
  //       });
  //     });
  // };

  const handlePlayNext = () => {
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrentSong(next);
      setQueue(rest);
    } else {
      setCurrentSong(null);
    }
  };

  return (
    <div className="flex flex-col bg-black space-y-6 min-h-screen p-4">
      <header className="flex justify-between">
        <div className="text-white font-extrabold text-3xl">Song voting queue</div>
        <Button
          className="bg-purple-400 hover:bg-purple-800 flex items-center space-x-2"
          // onClick={handleShare}
        >
          <Share2 size={18} />
          <span>Share</span>
        </Button>
      </header>

      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <Input
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            placeholder="Paste a Youtube link"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
          <Button 
          className="bg-purple-400 w-full hover:bg-purple-900"
          onClick={() => {
            fetch("/api/streams", {
              method: "POST",
              body: JSON.stringify({
                createrId: session.data?.user,
                url: inputLink
              })
            })
          }}
          >Add to queue</Button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <div className="text-white font-extrabold text-3xl">Now playing</div>
          <div className="flex items-center justify-center w-full max-w-[1000px] h-[200px] sm:h-[300px] md:h-[400px] bg-gray-900 text-white text-center text-lg md:text-xl rounded-xl shadow-md">
            {currentSong ? currentSong.title : "No video playing"}
          </div>
          <Button
            onClick={handlePlayNext}
            className="bg-purple-400 w-full hover:bg-purple-900 flex items-center justify-center space-x-2"
          >
            <Play size={18} />
            <span>Play Next</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <div className="text-white font-extrabold text-3xl">Upcoming Songs</div>

          {queue.map((song) => (
            <div
              key={song.id}
              className="w-full max-w-[1000px] min-h-[100px] sm:h-[150px] bg-gray-900 text-white rounded-xl shadow-md px-4"
            >
              <div className="pl-2 flex items-center h-full space-x-5">
                <img
                  src={song.thumbnailUrl}
                  alt={song.title}
                  className="w-[80px] sm:w-[130px] md:w-[170px] h-[50px] sm:h-[80px] md:h-[100px] rounded-md object-cover"
                />
                <div className="space-y-2 w-full">
                  <div className="text-lg sm:text-xl font-semibold truncate w-64">{song.title}</div>
                  <div className="flex items-center space-x-3">
                    
                    <Button
                      onClick={() => handleVote(song.id, song.haveUpvoted? false : true)}
                      className="bg-purple-400 flex items-center space-x-1 hover:bg-purple-800"
                    >
                      {song.haveUpvoted? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                      <span>{song.upVotes}</span>
                    </Button>
                    {/* <Button
                      onClick={() => handleVote(song.id, "downVote")}
                      className="bg-purple-400 flex items-center space-x-1 hover:bg-purple-800"
                    >
                      
                      <span>{song.downVote}</span>
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
