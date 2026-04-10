import Link from 'next/link';
import GalleryCard from '@/components/GalleryCard';
import ReviewCard from '@/components/ReviewCard';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery, reviewsQuery } from '@/sanity/lib/queries';
import { works as localWorks } from '@/data/works';
import { reviews as localReviews } from '@/data/reviews';

export const revalidate = 60;

export default async function HomePage() {
  let settings = null;
  let sanityReviews = [];

  try {
    [settings, sanityReviews] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(reviewsQuery),
    ]);
  } catch (e) {
    // Sanity pole seadistatud — kasutame kohalikku varuandmeid
  }

  const reviews = sanityReviews.length > 0 ? sanityReviews : localReviews;

  // Galerii 1 — Sanityst valitud või esimesed 3 kohalikust
  const gallery1Works = settings?.gallery1?.works?.length
    ? settings.gallery1.works
    : localWorks.filter((w) => w.category === localWorks[0]?.category).slice(0, 3);
  const gallery1Title = settings?.gallery1?.title || localWorks[0]?.category || 'Meie tööd';

  // Galerii 2 — Sanityst valitud või järgmised 3 kohalikust
  const localCat2 = localWorks.find((w) => w.category !== localWorks[0]?.category)?.category;
  const gallery2Works = settings?.gallery2?.works?.length
    ? settings.gallery2.works
    : localWorks.filter((w) => w.category === localCat2).slice(0, 3);
  const gallery2Title = settings?.gallery2?.title || localCat2 || '';

  return (
    <>
      {/* ─── Section 1: Hero ─────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="Pajaka Puidukoda töökoda"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/45" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Käsitöö, mis kestab põlvest põlve
          </h1>
          <p className="text-white/70 text-base md:text-lg tracking-wide mt-4">
            Unikaalne puidutöö teie kodusse
          </p>
        </div>
      </section>

      {/* ─── Section 2: Esimene galerii ──────────────────────────── */}
      {gallery1Works.length > 0 && (
        <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
          <p className="section-title">{gallery1Title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {gallery1Works.map((work) => (
              <GalleryCard key={work._id || work.id} work={work} showOverlay linkToDetail />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tehtud-tood" className="btn-outline">
              Vaata kõiki töid
            </Link>
          </div>
        </section>
      )}

      {/* ─── Section 3: Arvustused ───────────────────────────────── */}
      {reviews.length > 0 && (
        <section className="py-24 bg-beige/50">
          <div className="px-6 lg:px-10 max-w-7xl mx-auto">
            <p className="section-title">Mida kliendid ütlevad</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id || review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Section 4: Teine galerii ────────────────────────────── */}
      {gallery2Works.length > 0 && (
        <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
          <p className="section-title">{gallery2Title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {gallery2Works.map((work) => (
              <GalleryCard key={work._id || work.id} work={work} showOverlay linkToDetail />
            ))}
          </div>
        </section>
      )}

      {/* ─── Section 5: CTA ──────────────────────────────────────── */}
      <section className="py-24 bg-dark">
        <div className="text-center px-6 max-w-lg mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-background mb-4">
            Soovid midagi erilist?
          </h2>
          <p className="text-background/60 text-sm mb-10 leading-relaxed">
            Küsi meilt pakkumist. Valmistame teile just selline toote, mida
            soovite — teie mõõtude, materjali ja stiili järgi.
          </p>
          <Link href="/pakkumine" className="btn-primary">
            Küsi pakkumist
          </Link>
        </div>
      </section>
    </>
  );
}
