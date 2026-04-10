'use client';

/**
 * Sanity Studio — kättesaadav aadressil /studio
 * Siin saab lehe omanik lisada, muuta ja kustutada töid ning arvustusi.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
