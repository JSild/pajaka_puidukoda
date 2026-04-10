import { groq } from 'next-sanity';

// Avalehekülje seaded — singleton
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    gallery1 {
      title,
      works[]-> {
        _id,
        name,
        "slug": slug.current,
        category,
        shortDescription,
        mainImage,
      }
    },
    gallery2 {
      title,
      works[]-> {
        _id,
        name,
        "slug": slug.current,
        category,
        shortDescription,
        mainImage,
      }
    }
  }
`;

// All works, sorted by order then creation date
export const allWorksQuery = groq`
  *[_type == "work"] | order(order asc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    material,
    dimensions,
    mainImage,
    gallery,
  }
`;

// Works for the home page — first 3 of a given category
export const worksByCategoryQuery = groq`
  *[_type == "work" && category == $category] | order(order asc, _createdAt desc)[0...3] {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    mainImage,
  }
`;

// Single work by slug
export const workBySlugQuery = groq`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    material,
    dimensions,
    mainImage,
    gallery,
  }
`;

// All slugs (for generateStaticParams)
export const workSlugsQuery = groq`
  *[_type == "work"] { "slug": slug.current }
`;

// All reviews
export const reviewsQuery = groq`
  *[_type == "review"] | order(order asc, _createdAt asc) {
    _id,
    quote,
    reviewer,
    rating,
  }
`;
