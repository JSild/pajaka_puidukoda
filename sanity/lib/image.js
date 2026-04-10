import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Returns a Sanity image URL builder.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source) {
  return builder.image(source);
}
