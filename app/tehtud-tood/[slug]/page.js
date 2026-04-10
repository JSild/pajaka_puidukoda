import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { workBySlugQuery, workSlugsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await client.fetch(workSlugsQuery);
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = await client.fetch(workBySlugQuery, { slug });
  if (!work) return {};
  return {
    title: `${work.name} — Pajaka Puidukoda`,
    description: work.shortDescription,
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const work = await client.fetch(workBySlugQuery, { slug });
  if (!work) notFound();

  const mainImageUrl = work.mainImage
    ? urlFor(work.mainImage).width(1600).quality(85).url()
    : null;

  return (
    <div className="min-h-screen pt-24">
      {/* Hero image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] bg-beige overflow-hidden">
        {mainImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImageUrl}
            alt={work.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-dark/30 text-xs tracking-[0.2em] uppercase">Pilt</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        {/* Back link */}
        <Link
          href="/tehtud-tood"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-dark/50 hover:text-dark transition-colors duration-200 mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Tagasi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: title + description */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">
              {work.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-dark mb-6 leading-snug">
              {work.name}
            </h1>
            <div className="text-sm text-dark/70 leading-relaxed space-y-4">
              {(work.description || work.shortDescription || '')
                .split('\n\n')
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </div>

          {/* Right: details + CTA */}
          <div className="flex flex-col gap-6">
            {(work.material || work.dimensions) && (
              <div className="bg-beige p-8 rounded-sm">
                <h2 className="text-xs tracking-[0.25em] uppercase text-dark/50 mb-5">
                  Toote andmed
                </h2>
                <dl className="flex flex-col gap-4">
                  {work.material && (
                    <div className="flex flex-col gap-1">
                      <dt className="text-xs tracking-widest uppercase text-dark/40">Materjal</dt>
                      <dd className="text-sm text-dark">{work.material}</dd>
                    </div>
                  )}
                  {work.dimensions && (
                    <div className="flex flex-col gap-1">
                      <dt className="text-xs tracking-widest uppercase text-dark/40">Mõõtmed</dt>
                      <dd className="text-sm text-dark">{work.dimensions}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
            <Link href="/pakkumine" className="btn-primary text-center">
              Telli sarnane
            </Link>
          </div>
        </div>

        {/* Gallery */}
        {work.gallery && work.gallery.length > 0 && (
          <div className="mt-16">
            <p className="section-title !text-left !mb-6">Galerii</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {work.gallery.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden bg-beige">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(img).width(800).quality(80).url()}
                    alt={`${work.name} — foto ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
