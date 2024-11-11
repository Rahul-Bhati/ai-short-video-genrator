import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

import "./globals.css";
import Provider from "./provider";


export const metadata = {
  title: "Creati-V : AI Generator",
  description: "Effortlessly create high-quality content with AI-powered tools for text, image, and video generation. AI Creator offers 200+ templates, pre-built prompts, and an intuitive interface to bring your ideas to life 13x faster. Perfect for marketers, creators, and businesses looking to boost engagement and streamline workflows.",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" /> {/* Add this line for favicon */}
          <meta name="description" content="Discover AI Creator – the ultimate platform for fast and easy content creation. Generate text, images, and videos with AI-powered tools and pre-built templates for marketers, creators, and businesses." />
          <meta name="keywords" content="AI content creation, text-to-image, AI video generation, text-to-voice conversion, AI-powered tools, fast content creation, generative AI, AI templates, AI Creator, content creation platform" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph Metadata */}
          <meta property="og:title" content="Effortless AI Content Creation: Text, Images, Videos & More | AI Creator" />
          <meta property="og:description" content="Create high-quality AI-generated content in seconds with AI Creator. From text-to-image to video generation, streamline your workflow and boost engagement with powerful tools and templates." />
          <meta property="og:image" content="https://github.com/Rahul-Bhati/ai-short-video-genrator/blob/main/public/logo.png" />
          <meta property="og:url" content="https://creati-v.vercel.app/" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Metadata */}
          <meta name="twitter:title" content="Effortless AI Content Creation: Text, Images, Videos & More | AI Creator" />
          <meta name="twitter:description" content="Generate text, images, and videos with AI-powered tools. AI Creator's pre-built prompts and templates make content creation easy for everyone." />
          <meta name="twitter:image" content="https://x.com/RahulBh77113306/photo" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body
          className={outfit.className}
        >
          <Provider>

            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
