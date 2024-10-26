// import { Button } from "@/components/ui/button";
// import { UserButton } from "@clerk/nextjs";
// import { ArrowRight, Video } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <>
//       <div className='p-3 px-5 flex items-center justify-between shadow-md'>
//         <div className='flex gap-3 items-center'>
//           <Image src={"/logo.svg"} width={30} height={30} alt='logo' />
//           <h2 className='text-xl font-bold'>Ai Short Vid</h2>
//         </div>
//         <div className='flex gap-3 items-center'>
//           <Link href={"/dashboard"}>
//             <Button>Login</Button>
//           </Link>
//         </div>
//       </div>
//       <main>
//         <div className="flex flex-col justify-center items-center mt-12 gap-5">
//           <div className="mb-7">
//             <span className="font-bold bg-slate-300 py-4 pl-4 pr-12 rounded-3xl"><Button className="pl-4 rounded-3xl mr-3">New</Button> All new Apps</span>
//           </div>
//           <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">Build your Short Video <span className="text-blue-700">With Ai</span></h1>
//           <p className="text-gray-500 font-bold">Effortlessly Build AI-Generated Short Videos in Minutes.</p>
//           <div className="flex justify-center items-center gap-2">
//             <Link href={"/dashboard"}>
//               <Button className="py-6 px-4">Get Started <ArrowRight className="ml-2" /></Button>
//             </Link>
//             <Button variant="ghost" className="py-6 px-4">  <Video className="mr-2" /> Watch Videos</Button>
//           </div>
//         </div>
//       </main>
//       <h1>Home</h1>
//       <UserButton />
//     </>
//   );
// }

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Image as ImageIcon, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 text-white" style={{ backgroundImage: 'url("https://assets.cohesive.so/landing/BG-Landing.webp?fm=webp")' }}>
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <ImageIcon className="h-6 w-6 mr-2" />
            <span className="font-bold">AI Creator</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Contact
            </Link>
            <Link href={"/dashboard"} className="text-sm font-medium hover:underline underline-offset-4">
              Login
            </Link>
          </nav>
        </header>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold md:mx-[10%] sm:text-4xl md:text-5xl lg:text-6xl/none tracking-normal">
                  Effortless AI Creations—Text, Images, Videos, and More at Your Fingertips
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl dark:text-gray-400 py-4">
                  With pre-built prompts and powerful AI tools, generate stunning content without the hassle. From
                  text-to-image to video generation, we handle the complexity so you can focus on creating.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/dashboard"}>
                  <Button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-6 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Create Instantly
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="flex gap-2 text-sm text-gray-300 items-center my-5"><Info size={"16px"} /> No Prompts Needed</p>
                {/* <Button className="bg-purple-500 text-clip">Get Started for Free</Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 text-black bg-white lg:py-32 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Meet the future of generative AI
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Image src={"/template.png"} width={50} height={50} />
                <h3 className="text-xl font-bold">200+ Templates to start with</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Create stunning content 13x faster with curated AI-powered templates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Image src={"/image-generator.png"} width={50} height={50} />
                <h3 className="text-xl font-bold">Text-to-Image Generation</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Transform your words into stunning visuals with our AI-powered image generation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Image src={"/voice-message.png"} width={50} height={50} />
                <h3 className="text-xl font-bold">Text-to-Voice Conversion</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Bring your text to life with natural-sounding voices in multiple languages.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Image src={"/video-sharing.png"} width={50} height={50} />
                <h3 className="text-xl font-bold">AI-powered Video Generation</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Create engaging videos from your content with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 text-black bg-white md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="AI-generated content showcase"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/chatimg.jpeg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock AI Power—Generate in Seconds
                </h2>
                <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Save time, boost creativity, and produce high-quality content without technical expertise. Our
                  pre-built prompts and intuitive interface make AI-powered creation accessible to everyone.
                </p>
                <Link href={"/dashboard"}>
                  <Button className="w-full md:w-1/2 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Start Creating with AI Effortlessly Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 text-black bg-white md:py-24 lg:py-32 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from the creators who have transformed their workflow with our AI-powered tools.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                alt="Testimonial author"
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                height="200"
                src="/user1.jpg"
                width="200"
              />
              <div className="flex flex-col justify-center space-y-4">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                  "Since switching to AI Creator, we've reduced content production time by 70%. Our audience engagement
                  is at an all-time high!"
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director, TechInnovate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 text-black bg-white  md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Content Creation?
                </h2>
                <p className="max-w-[600px] px-auto mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of creators who are already using AI Creator to produce stunning content effortlessly.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 pt-4">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial today. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 AI Creator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Free Trial
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Product Demo
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}