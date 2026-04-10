export default {
  name: 'work',
  title: 'Töö',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nimi',
      type: 'string',
      validation: (Rule) => Rule.required().error('Nimi on kohustuslik'),
    },
    {
      name: 'slug',
      title: 'URL-i osa',
      type: 'slug',
      description: 'Klõpsa "Generate" nupul — see luuakse nimest automaatselt.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required().error('URL-i osa on kohustuslik'),
    },
    {
      name: 'category',
      title: 'Kategooria',
      type: 'string',
      description: 'Kirjuta kategooria täpselt nii nagu tahad (nt "Köögimööbel", "Trepid"). Sama nimega tööd grupeeritakse kokku.',
      validation: (Rule) => Rule.required().error('Kategooria on kohustuslik'),
    },
    {
      name: 'mainImage',
      title: 'Põhipilt',
      type: 'image',
      options: { hotspot: true },
      description: 'Peamine pilt, mis kuvatakse galeriis.',
    },
    {
      name: 'shortDescription',
      title: 'Lühikirjeldus',
      type: 'text',
      rows: 3,
      description: 'Lühike kirjeldus (2–3 lauset), mis kuvatakse galeriikaardikel.',
    },
    {
      name: 'description',
      title: 'Täiskirjeldus',
      type: 'text',
      rows: 8,
      description: 'Pikem kirjeldus töö detaillehel — materjalid, protsess, mõõtmed jne.',
    },
    {
      name: 'material',
      title: 'Materjal',
      type: 'string',
      description: 'nt "Tamm (massiiv)", "Mänd + metall"',
    },
    {
      name: 'dimensions',
      title: 'Mõõtmed',
      type: 'string',
      description: 'nt "200 × 90 × 76 cm"',
    },
    {
      name: 'gallery',
      title: 'Galerii (lisapildid)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Täiendavad pildid, mis kuvatakse töö detaillehel.',
    },
    {
      name: 'order',
      title: 'Järjekord',
      type: 'number',
      description: 'Väiksem number kuvatakse eespool (nt 1, 2, 3…). Valikuline.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Järjekorra järgi',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Lisamisaja järgi (uuemad eespool)',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
