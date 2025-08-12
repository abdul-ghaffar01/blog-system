import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex items-center justify-center w-full h-[60vh] overflow-hidden">
      {/* left image */}
      <div className="hidden md:block md:flex-1 h-full relative">
        <Image
          src="/hero_section.png"
          alt="Blog reading guy image"
          fill
          className="object-cover"
          priority
        />
      </div>


      {/* angled divider */}
      <div className="relative hidden md:block right-8 bg-background rotate-[7deg] w-15 h-[200%] "></div>

      {/* right content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-background flex-1 flex flex-col justify-center md:pr-8 px-2 md:px-0 text-center md:text-left"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Welcome to{" "}
          <span className="text-primary">Your Knowledge Hub</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto md:mx-0"
        >
          Explore expert insights on web development, cloud computing,
          microservices, and modern programming trends. Stay ahead with
          practical guides and tutorials.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 flex gap-4 mx-auto md:mx-0"
        >
          <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
            Start Reading
          </button>
          <button className="px-6 py-3 rounded-lg border border-input hover:bg-muted transition">
            Explore Topics
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
