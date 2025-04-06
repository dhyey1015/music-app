import Image from "next/image";
import { AppBar } from "./components/AppBar";
import { Button } from "@/components/ui/button";
import { Headphones, Link, Music, Radio, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <header className="px-4 lg:px-6 h-14 flex items-center">
       
            <Link href={"#"} className="flex items-center justify-center">
              <Music className="h-6 w-6 text-purple-400" />
              {/*TODO: solve this hydration problem*/}
              <p className="ml-2 text-lg font-bold text-purple-400">Muizo</p>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href={"#"} className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                    Features
                </Link>
                <Link href={"#"} className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                    Pricing
                </Link>
            </nav>
      
        </header>
        <main className="flex-1 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Let Your Fans Choose the Beat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Empower your audience to curate your music stream. Connect with fans like never before.
                </p>
                <div className="space-x-4">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">Get Started</Button>
                  <Button variant={"outline"} className="text-purple-400 border border-purple-400 hover:bg-purple-400 hover:text-gray-900">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 bg-opacity-50">
          <div className="container px-4md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8 text-white">
                Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-12 w-12 text-yellow-400"/>
                <h3 className="text-xl text-bold text-white">Fan Interaction</h3>
                <p className="text-gray-400">Let fan choose the music.</p>
              </div>
              <div className="flex flex-col items-center spcace-y-3 text-center">
                <Radio className="h-12 w-12 text-green-400 mb-3"/>
                <h3 className="text-xl text-bold text-white mb-3">Live Streaming</h3>
                <p className="text-gray-400">Stream with real-time input</p>
              </div>
              <div className="flex flex-col items-center spcace-y-3 text-center">
                <Headphones className="h-12 w-12 text-blue-400 mb-3"/>
                <h3 className="text-xl text-bold text-white mb-3">Live Streaming</h3>
                <p className="text-gray-400">Stream with real-time input</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Ready to Transform Your Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join Muizo today and create unforgettable experiences.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form action="#" className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    placeholder="Enter Your email"
                    type="email"
                  />
                  <Button type="submit"  className="bg-purple-600 text-whitem hover:bg-purple-700">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">2025 Muizo. All rights reserved</p>
          <nav className="sm:ml-auto flex gap-4 ms:gap-6">
            <Link href="#" className="text-xs text-gray-400 hover:text-purple-400 transition-colors">
              Terms and Conditions
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-purple-400 transition-colors">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
