"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type Song = {
  id: number;
  title: string;
  likes: number;
  dislikes: number;
};

export default function Dashboard() {
  const [queue, setQueue] = useState<Song[]>([
    { id: 1, title: "Song A", likes: 2, dislikes: 1 },
    { id: 2, title: "Song B", likes: 0, dislikes: 0 },
    { id: 3, title: "Song C", likes: 1, dislikes: 0 },
  ]);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleVote = (id: number, type: "like" | "dislike") => {
    setQueue((prev) =>
      [...prev].map((song) =>
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

  const handlePlayNext = () => {
    if (queue.length === 0) return;
    const [nextSong, ...restQueue] = queue;
    setCurrentSong(nextSong);
    setQueue(restQueue);
  };

  return (
    <div className="flex flex-col bg-black space-y-6 min-h-screen p-4">
      {/* Header */}
      <header className="flex justify-between">
        <div className="text-white font-extrabold text-3xl">Song voting queue</div>
        <Button className="bg-purple-400">Share</Button>
      </header>

      {/* Youtube Input */}
      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <Input
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            placeholder="Paste a Youtube link"
          />
          <Button className="bg-purple-400 w-full hover:bg-purple-900">Add to queue</Button>
        </div>
      </div>

      {/* Now Playing */}
      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <div className="text-white font-extrabold text-3xl">Now playing</div>
          <div className="flex items-center justify-center w-full max-w-[1000px] h-[200px] sm:h-[300px] md:h-[400px] bg-gray-900 text-white text-center text-lg md:text-xl rounded-xl shadow-md">
            {currentSong ? currentSong.title : "No video playing"}
          </div>
          <Button onClick={handlePlayNext} className="bg-purple-400 w-full hover:bg-purple-900">
            Play Next
          </Button>
        </div>
      </div>

      {/* Upcoming Songs Queue */}
      <div className="flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[800px]">
          <div className="text-white font-extrabold text-3xl">Upcoming Songs</div>

          {queue.length === 0 ? (
            <div className="text-white">No songs in queue</div>
          ) : (
            queue.map((song) => (
              <div
                key={song.id}
                className="w-full max-w-[1000px] min-h-[100px] sm:h-[150px] bg-gray-900 text-white rounded-xl shadow-md px-4"
              >
                <div className="pl-2 flex items-center h-full space-x-5">
                  <div className="flex items-center justify-center w-[80px] sm:w-[130px] md:w-[170px] h-[50px] sm:h-[80px] md:h-[100px] bg-white text-black rounded-md text-xl font-bold">
                    🎵
                  </div>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
