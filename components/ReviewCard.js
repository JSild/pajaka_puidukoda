function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} täht viiest`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#C8A97E' : 'none'}
          stroke="#C8A97E"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  return (
    <article className="flex flex-col gap-5 bg-beige border border-dark/8 rounded-sm p-8">
      <StarRating rating={review.rating} />
      <blockquote className="text-sm text-dark/70 leading-relaxed italic flex-1">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <p className="text-xs tracking-[0.15em] uppercase text-dark/50 font-medium">
        {review.reviewer}
      </p>
    </article>
  );
}
