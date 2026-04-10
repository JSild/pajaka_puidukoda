export default {
  name: 'review',
  title: 'Arvustus',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Tsitaat',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Tsitaat on kohustuslik'),
    },
    {
      name: 'reviewer',
      title: 'Arvustaja nimi',
      type: 'string',
      validation: (Rule) => Rule.required().error('Nimi on kohustuslik'),
    },
    {
      name: 'rating',
      title: 'Tärnide arv (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Hinne peab olema 1–5'),
    },
    {
      name: 'order',
      title: 'Järjekord',
      type: 'number',
      description: 'Väiksem number kuvatakse eespool. Valikuline.',
    },
  ],
  preview: {
    select: {
      title: 'reviewer',
      subtitle: 'quote',
    },
  },
};
