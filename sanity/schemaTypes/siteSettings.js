export default {
  name: 'siteSettings',
  title: 'Avalehekülje seaded',
  type: 'document',
  // Singleton — ainult üks dokument lubatud
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'gallery1',
      title: 'Esimene galerii (enne arvustusi)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Galerii pealkiri',
          type: 'string',
          placeholder: 'nt "Köögimööbel"',
        },
        {
          name: 'works',
          title: 'Näidatavad tööd',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'work' }] }],
          validation: (Rule) =>
            Rule.max(3).warning('Soovitatav on kuni 3 tööd'),
          description: 'Vali kuni 3 tööd, mida soovid selles sektsioonis näidata.',
        },
      ],
    },
    {
      name: 'gallery2',
      title: 'Teine galerii (pärast arvustusi)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Galerii pealkiri',
          type: 'string',
          placeholder: 'nt "Eritellimusmööbel"',
        },
        {
          name: 'works',
          title: 'Näidatavad tööd',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'work' }] }],
          validation: (Rule) =>
            Rule.max(3).warning('Soovitatav on kuni 3 tööd'),
          description: 'Vali kuni 3 tööd, mida soovid selles sektsioonis näidata.',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Avalehekülje seaded' };
    },
  },
};
