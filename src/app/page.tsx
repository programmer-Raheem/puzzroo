import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero";
import { FreeGames } from "@/components/sections/FreeGames";
import { Features } from "@/components/sections/Features";
import { EarlyLegends } from "@/components/sections/EarlyLegends";
import { FAQ } from "@/components/sections/FAQ";
import { AboutPuzzroo } from "@/components/sections/AboutPuzzroo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#181A20] transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="w-full max-w-[1380px] mx-auto flex-grow flex flex-col pb-0 md:pb-[50px]">
        <main className="flex-grow flex flex-col justify-start ">
          <Hero />
          <FreeGames />
          <div className="md:mb-12">
            <Features />
          </div>
          <EarlyLegends />
          <FAQ />
          <AboutPuzzroo />
        </main>
      </div>
      <Footer />
    </div>
  );
}
