import {
  textImage,
  fullWidthText,
  pageList,
  fullWidthVideo,
  featuredContent,
  getMainContent,
  getImage,
  getVideo,
  multipleImages,
  navigationContent,
  textVideo
} from "../cmsComponents";

console.log(`*** pages contentPath: @contentPath ***`);

export default {
  name: "pages",
  label: "Pages",
  format: "yaml",
  create: true,
  folder: "@contentPath/pages",
  editor: {
    preview: false
  },
  summary: "{{title}} / {{mainContent.subhead}}",
  fields: [
    {
      name: "uuid",
      widget: "uuid"
    },

    {
      label: "Parent Page",
      name: "parentPage",
      widget: "relation",
      collection: "pages",
      default: null,
      required: false,
      searchFields: ["title", "slug"],
      valueField: "uuid",
      displayFields: ["title"]
    },

    {
      label: "Title",
      name: "title",
      widget: "string"
    },

    getImage("Cover Image", "coverImage"),
    getVideo("Cover video", "coverVideo"),
    getImage("Background Image", "backgroundImage"),
    getVideo("Background video", "backgroundVideo"),
    getMainContent(false),
    featuredContent,
    navigationContent,
    {
      label: "component-type",
      name: "componentType",
      widget: "hidden",
      default: "page"
    },
    {
      label: "Component",
      name: "component",
      widget: "list",
      types: [
        textImage,
        fullWidthVideo,
        fullWidthText,
        multipleImages,
        textVideo,

        {
          label: "List Of Subpages",
          name: "PageList",
          widget: "object",
          hint: "This is the list you would like to show on the page",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
              default: "Header text"
            },
            {
              label: "Show as Featured",
              name: "featured",
              widget: "boolean",
              default: false,
              required: false
            },

            pageList
          ]
        }
      ]
    }, {
      label: "Next Page",
      name: "nextPage",
      required: false,
      widget: "relation",
      collection: "pages",
      searchFields: ["title", "slug", "uuid"],
      valueField: "uuid",
      displayFields: ["title", "slug"]
    }, {
      label: "Previous Page",
      name: "previousPage",
      required: false,
      widget: "relation",
      collection: "pages",
      searchFields: ["title", "slug", "uuid"],
      valueField: "uuid",
      displayFields: ["title", "slug"]
    }
  ]
};
