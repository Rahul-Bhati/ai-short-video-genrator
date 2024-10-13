import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
          <Image src={"/logo.svg"} width={30} height={30} alt='logo' />
          <h2 className='text-xl font-bold'>Ai Short Vid</h2>
        </div>
        <div className='flex gap-3 items-center'>
          <Link href={"/dashboard"}>
            <Button>Login</Button>
          </Link>
        </div>
      </div>
      <main>
        <div className="flex flex-col justify-center items-center mt-12 gap-5">
          <div className="mb-7">
            <span className="font-bold bg-slate-300 py-4 pl-4 pr-12 rounded-3xl"><Button className="pl-4 rounded-3xl mr-3">New</Button> All new Apps</span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">Build your Short Video <span className="text-blue-700">With Ai</span></h1>
          <p className="text-gray-500 font-bold">Effortlessly Build AI-Generated Short Videos in Minutes.</p>
          <div className="flex justify-center items-center gap-2">
            <Link href={"/dashboard"}>
              <Button className="py-6 px-4">Get Started <ArrowRight className="ml-2" /></Button>
            </Link>
            <Button variant="ghost" className="py-6 px-4">  <Video className="mr-2" /> Watch Videos</Button>
          </div>
        </div>
      </main>
      <h1>Home</h1>
      <UserButton />
    </>
  );
}
