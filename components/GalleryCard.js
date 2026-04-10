import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

/**
 * Tagastab pildi URL-i — töötab nii Sanity pildireferentsidega (objekt)
 * kui ka tavaliste URL-stringidega (kohalikud pildid).
 */
function resolveImageUrl(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return urlFor(image).width(800).quality(80).url();
}

export default function GalleryCard({ work, showOverlay = false, linkToDetail = true }) {
  const imageUrl = resolveImageUrl(work.mainImage || work.image);

  const ImageContainer = (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-beige group">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={work.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-beige">
          <span className="text-dark/30 text-xs tracking-[0.2em] uppercase">Pilt</span>
        </div>
      )}

      {showOverlay && (
        <div className="absolute inset-0 bg-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-background text-xs tracking-[0.35em] uppercase">Vaata</span>
        </div>
      )}
    </div>
  );

  const CardContent = (
    <article className="flex flex-col">
      {ImageContainer}
      <div className="pt-4">
        <h3 className="font-serif text-base text-dark mb-1">{work.name}</h3>
        <p className="text-sm text-dark/55 leading-relaxed line-clamp-3">
          {work.shortDescription}
        </p>
      </div>
    </article>
  );

  if (linkToDetail) {
    return (
      <Link href={`/tehtud-tood/${work.slug}`} className="block group">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
