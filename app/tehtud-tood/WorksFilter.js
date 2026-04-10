'use client';

import { useState } from 'react';
import GalleryCard from '@/components/GalleryCard';

export default function WorksFilter({ works, categories }) {
  const [activeCategory, setActiveCategory] = useState('Kõik');

  const filtered =
    activeCategory === 'Kõik'
      ? works
      : works.filter((w) => w.category === activeCategory);

  return (
    <>
      {/* Category filter pills */}
      <div
        className="flex flex-wrap justify-center gap-3 mb-14"
        role="tablist"
        aria-label="Filtreeri kategooria järgi"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-colors duration-200 rounded-sm ${
              activeCategory === cat
                ? 'bg-dark text-background border-dark'
                : 'bg-transparent text-dark border-dark/30 hover:border-dark/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((work) => (
            <GalleryCard key={work._id} work={work} showOverlay linkToDetail />
          ))}
        </div>
      ) : (
        <p className="text-center text-dark/40 text-sm py-20">
          Selles kategoorias tooteid ei leitud.
        </p>
      )}
    </>
  );
}
