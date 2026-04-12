import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stockImages, BRAND } from "@/config/brand";
import { ArrowRight } from "lucide-react";

/**
 * Editorial “drop” strip: hero + tile grid — stock imagery for seasonal announcement.
 */
export const SeasonAnnouncement: React.FC = () => {
  return (
    <section
      id="season-announcement"
      aria-labelledby="season-announcement-heading"
      className="scroll-mt-24 border-b border-border/60 bg-[#f5f5f7] dark:border-white/10 dark:bg-[#0a0a0a] sm:scroll-mt-28"
    >
      <div className="lunar-container py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="mb-6 flex flex-col gap-2 text-center sm:mb-8 md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary sm:text-xs">New season</p>
          <h2
            id="season-announcement-heading"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl md:leading-[1.15] lg:text-4xl"
          >
            The <span className="font-bold">{BRAND.name}</span> spring edit — lighter layers, sharper lines.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:mx-0 md:text-[17px]">
            Breathable cottons, washed silks, and outerwear that moves with you. Recycled packaging; members get early
            access to drops.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative min-h-[280px] flex-1 overflow-hidden rounded-2xl sm:min-h-[320px] lg:min-h-[380px] lg:max-w-[58%]"
          >
            <img
              src={stockImages.announcementHero}
              alt="Spring clothing collection"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">In store & online</p>
              <p className="text-base font-semibold text-white sm:text-lg md:text-xl">Editorial fit. Everyday ease.</p>
              <Link
                to="/search?q=spring"
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                Shop the drop <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <div className="grid flex-1 grid-cols-2 gap-3 md:gap-4 lg:max-w-[42%] lg:grid-rows-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-square"
            >
              <img src={stockImages.announcementTileA} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/30" />
              <Link
                to="/men"
                className="absolute inset-0 flex min-h-[44px] items-end p-3 text-sm font-bold text-white sm:p-4"
              >
                Men
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-square"
            >
              <img src={stockImages.announcementTileB} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/30" />
              <Link
                to="/women"
                className="absolute inset-0 flex min-h-[44px] items-end p-3 text-sm font-bold text-white sm:p-4"
              >
                Women
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl sm:aspect-[21/9]"
            >
              <img src={stockImages.announcementTileC} alt="" className="h-full w-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Limited run</span>
                <Link to="/kids" className="w-fit text-sm font-bold text-primary underline-offset-4 hover:underline">
                  Explore kids →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
