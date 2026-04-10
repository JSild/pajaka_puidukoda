import { client } from '@/sanity/lib/client';
import { allWorksQuery } from '@/sanity/lib/queries';
import WorksFilter from './WorksFilter';

export const revalidate = 60;

export default async function TehtudToodPage() {
  const works = await client.fetch(allWorksQuery);

  // Kategooriad tuletatakse automaatselt töödest — lisa uus töö uue kategooriaga ja see ilmub siia
  const uniqueCategories = [
    'Kõik',
    ...new Set(works.map((w) => w.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <p className="section-title">Tehtud tööd</p>
      <WorksFilter works={works} categories={uniqueCategories} />
    </div>
  );
}
