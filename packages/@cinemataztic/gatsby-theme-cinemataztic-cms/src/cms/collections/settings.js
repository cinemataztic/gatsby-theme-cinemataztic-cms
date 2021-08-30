import {
  textImage,
  imageImage,
  fullWidthText,
  pageList,
  fullWidthVideo,
  getMainContent,
  whiteSpacePattern,
  getImage,
  getVideo,
  multipleImages,
  linkBtn,
  getMultipleButtons,
} from '../cmsComponents'
import { BRAND_COLORS } from '../colors'

export default {
  name: 'Settings',
  label: 'Settings',
  description: 'Manage central settings here: Front page, footer, metadata etc.',
  create: false,
  identifier_field: 'urlPath',
  slug: '{{slug}}',
  editor: {
    preview: false,
  },
  files: [
    {
      name: 'Frontpage',
      label: 'Frontpage',
      file: '@settingsPath/frontpage/index.yml',
      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
          hint: 'Only shown in the cms',
        },

        {
          label: 'Urlpath',
          name: 'urlPath',
          widget: 'string',
          required: true,
          pattern: whiteSpacePattern,
          hint: 'Must be unique, used for direct links',
        },
        getImage('Cover Image', 'coverImage'),
        getVideo('Cover video', 'coverVideo'),
        getImage('Background Image', 'backgroundImage'),
        getVideo('Background video', 'backgroundVideo'),

        getMainContent(false, false),

        {
          label: 'Component',
          name: 'component',
          widget: 'list',

          types: [
            textImage,
            imageImage,
            fullWidthText,
            fullWidthVideo,
            multipleImages,

            {
              label: 'Page list',
              name: 'PageList',
              widget: 'object',
              hint: 'This is the list you would like to show on the page',
              fields: [
                {
                  label: 'Title',
                  name: 'title',
                  widget: 'string',
                  default: 'Pages',
                },
                {
                  label: 'Show as Featured',
                  name: 'featured',
                  widget: 'boolean',
                  default: false,
                  required: false,
                },
                pageList,
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'General',
      label: 'General',
      file: '@settingsPath/general/index.yml',
      editor: {
        preview: false,
      },
      fields: [
        {
          label: 'Page Title',
          name: 'pageTitle',
          widget: 'string',
          required: true,
        },
        {
          label: 'Company Name',
          name: 'companyName',
          widget: 'string',
          required: true,
        },

        {
          name: 'brandColors',
          label: 'Brand colors',
          widget: 'mycolor',
          picker: 'sketch',
          presetColors: BRAND_COLORS,
        },

        getImage('Logo', 'logo'),
        getImage('Small Logo', 'logoSmall'),
        getImage('Favicon', 'favicon'),
      ],
    },
    {
      name: 'Meta / SEO',
      label: 'Meta / SEO',
      file: '@settingsPath/meta/index.yml',
      create: true,
      editor: {
        preview: false,
      },
      fields: [
        {
          label: 'Open Graph Title',
          name: 'og_title',
          widget: 'string',
          required: true,
        },
        {
          label: 'Open Graph Description',
          name: 'og_description',
          widget: 'string',
          required: true,
        },
        {
          label: 'Open Graph Type',
          name: 'og_:type',
          widget: 'string',
          required: true,
        },

        getImage('Open Graph Image', 'og_image'),

        {
          label: 'Facebook Link',
          name: 'facebookLink',
          widget: 'string',
          required: false,
          hint: 'Link to your facebook page',
        },

        {
          label: 'LinkedIn Link',
          name: 'linkedinLink',
          widget: 'string',
          required: false,
          hint: 'Link to your LinkedIn page',
        },

        {
          label: 'Instagram Link',
          name: 'instagramLink',
          widget: 'string',
          required: false,
          hint: 'Link to your Instagram Page',
        },
      ],
    },
    {
      label: 'Footer',
      name: 'footer',
      file: '@settingsPath/footer/index.yml',
      editor: {
        preview: false,
      },

      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
          hint: 'Only shown in the cms',
        },

        {
          label: 'Headline',
          name: 'headline',
          widget: 'string',
          default: '',
          required: false,
        },

        {
          label: 'Description',
          name: 'description',
          widget: 'string',
          default: '',
          required: false,
        },

        {
          label: 'component-type',
          name: 'componentType',
          widget: 'hidden',
          default: 'footer',
        },

        {
          label: 'Contact information',
          name: 'body',
          widget: 'markdown',
          required: false,
        },

        {
          label: 'Footer column',
          name: 'footerColumn',
          widget: 'list',
          allow_add: true,
          fields: [
            {
              label: 'Column Title',
              name: 'columnTitle',
              widget: 'string',
            },
            {
              label: 'Column',
              name: 'size',
              widget: 'select',
              required: false,
              multiple: false,
              options: ['12.5%', '25%', '50%'],
              default: '24%',
            },
            {
              label: 'Footer item',
              name: 'footerItem',
              widget: 'list',
              allow_add: true,
              fields: [
                {
                  label: 'Link title',
                  name: 'title',
                  widget: 'string',
                  default: '',
                },

                {
                  label: 'Url',
                  name: 'url',
                  widget: 'string',
                  default: '',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
