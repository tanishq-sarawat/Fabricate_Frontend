import { useState, useEffect } from 'react';

export const AUTH_HERO_IMAGES = [
  {
    src: '/auth-hero-cookies.jpg',
    alt: 'Artisan Sea Salt Chocolate Chunk Cookies & Bakery CPG',
    tag: 'Bakery & Confectionery',
    caption: 'Verified Contract Bakery & Snack Packaging',
  },
  {
    src: '/auth-hero-beverage.jpg',
    alt: 'Botanical Sparkling Infusion Canned Beverage',
    tag: 'Functional Beverages',
    caption: 'High-Speed Canning & Aseptic Cold Fill Network',
  },
  {
    src: '/auth-hero-wellness.jpg',
    alt: 'Organic Cold-Pressed Wellness Shots & Botanical Tinctures',
    tag: 'Health & Wellness',
    caption: 'Audited Extraction & Cleanroom Filling Facilities',
  },
];

export const AuthHero = () => {
  // Randomly select one of the high-end CPG hero images on initial load
  const [hero, setHero] = useState(() => {
    const randomIndex = Math.floor(Math.random() * AUTH_HERO_IMAGES.length);
    return AUTH_HERO_IMAGES[randomIndex];
  });

  // Automatically rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHero((prev) => {
        const currentIndex = AUTH_HERO_IMAGES.findIndex((img) => img.src === prev.src);
        const nextIndex = (currentIndex + 1) % AUTH_HERO_IMAGES.length;
        return AUTH_HERO_IMAGES[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeIndex = AUTH_HERO_IMAGES.findIndex((img) => img.src === hero.src);

  return (
    <div className="hidden lg:block lg:w-1/2 relative lg:h-screen bg-[#1c1917] overflow-hidden select-none">
      {/* Background Images with smooth cinematic cross-fade */}
      {AUTH_HERO_IMAGES.map((item, idx) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      ))}

      {/* Subtle bottom gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

      {/* Keychain Minimalist Badge & Progress Indicators */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between pointer-events-none">
        <div className="flex flex-col gap-1.5 transition-all duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
            <span>{hero.tag}</span>
          </div>
          <p className="text-white/80 text-xs font-normal drop-shadow-sm">
            {hero.caption}
          </p>
        </div>

        {/* Carousel slide indicators */}
        <div className="flex items-center gap-1.5">
          {AUTH_HERO_IMAGES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === activeIndex ? 'w-5 bg-[#f5cb39]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
