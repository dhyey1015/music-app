"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Song = {
  id: number;
  title: string;
  likes: number;
  dislikes: number;
  thumbnailUrl: string;
};

export default function SongVotingQueue() {
  const [queue, setQueue] = useState<Song[]>([
    {
      id: 1,
      title: "Song A",
      likes: 2,
      dislikes: 1,
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
    },
    {
      id: 2,
      title: "Song B",
      likes: 0,
      dislikes: 0,
      thumbnailUrl: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg",
    },
    {
      id: 3,
      title: "Song C",
      likes: 1,
      dislikes: 0,
      thumbnailUrl: "https://img.youtube.com/vi/L_jWHffIx5E/0.jpg",
    },
  ]);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleVote = (id: number, type: "like" | "dislike") => {
    setQueue((prev) =>
      [...prev]
        .map((song) =>
          song.id === id
            ? {
                ...song,
                likes: type === "like" ? song.likes + 1 : song.likes,
                dislikes: type === "dislike" ? song.dislikes + 1 : song.dislikes,
              }
            : song
        )
        .sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes))
    );
  };

  const handleShare = () => {
    const shareableLink = window.location.href;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast.success("🔗 Link copied to clipboard!", {
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #9333ea",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        });
      })
      .catch(() => {
        toast.error("❌ Failed to copy link.", {
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #ef4444",
            padding: "12px 16px",
            borderRadius: "8px",
          },
        });
      });
  };

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
          onClick={handleShare}
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
          />
          <Button className="bg-purple-400 w-full hover:bg-purple-900">Add to queue</Button>
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
              <div className="text-lg sm:text-xl font-semibold truncate">{song.title}</div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleVote(song.id, "like")}
                  className="bg-purple-400 flex items-center space-x-1"
                >
                  <ThumbsUp size={18} />
                  <span>{song.likes}</span>
                </Button>
                <Button
                  onClick={() => handleVote(song.id, "dislike")}
                  className="bg-purple-400 flex items-center space-x-1"
                >
                  <ThumbsDown size={18} />
                  <span>{song.dislikes}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ToastContainer position="top-center" />
    </div>
  );
}
