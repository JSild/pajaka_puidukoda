import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const SITE_SETTINGS_ID = 'siteSettings-singleton';

export default defineConfig({
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  title: 'Pajaka Puidukoda',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sisu')
          .items([
            // Singleton — avalehekülje seaded
            S.listItem()
              .title('Avalehekülje seaded')
              .icon(() => '🏠')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId(SITE_SETTINGS_ID)
                  .title('Avalehekülje seaded')
              ),

            S.divider(),

            S.listItem()
              .title('Tehtud tööd')
              .icon(() => '🪵')
              .child(S.documentTypeList('work').title('Tehtud tööd')),

            S.listItem()
              .title('Arvustused')
              .icon(() => '⭐')
              .child(S.documentTypeList('review').title('Arvustused')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
