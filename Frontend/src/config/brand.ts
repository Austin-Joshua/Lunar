/** Lunar brand — single accent (gold) + curated stock imagery (Unsplash). */

export const BRAND = {
  name: "LUNAR",
  tagline: "Essential luxury, cut for real life.",
} as const;

/** Gold accent — use via `text-primary`, `bg-primary`, or `border-primary` (see `index.css`). */
export const accent = {
  focus: "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
} as const;

/** Stock photos: fashion / clothing (Unsplash). */
export const stockImages = {
  announcementHero:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=85&auto=format&fit=crop",
  announcementTileA:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop",
  announcementTileB:
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=85&auto=format&fit=crop",
  announcementTileC:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop",
  kidsEditorial:
    "https://images.unsplash.com/photo-1503919545889-aef6e10ad4d8?w=1400&q=85&auto=format&fit=crop",
  craftEditorial:
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1200&q=85&auto=format&fit=crop",
} as const;
