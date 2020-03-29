import {
  textImage,
  fullWidthText,
  pageList,
  fullWidthVideo,
  getMainContent,
  whiteSpacePattern,
  getImage,
  getVideo,
  multipleImages
} from "../cmsComponents";

console.log(`*** frontpage contentPath: @contentPath ***`);
console.log(`*** dirname: ${__dirname} ***`);

export default {
  name: "Main configuration",
  label: "Main configuration",
  create: false,
  identifier_field: "urlPath",
  slug: "{{slug}}",
  files: [
    {
      name: "Frontpage",
      label: "Frontpage",
      file: "@contentPath/frontpage/index.yaml",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          hint: "Only shown in the cms"
        },

        {
          label: "Urlpath",
          name: "urlPath",
          widget: "string",
          required: true,
          pattern: whiteSpacePattern,
          hint: "Must be uniq, used for direct links"
        },

        getImage("Background Image", "backgroundImage"),
        getVideo("Background video", "backgroundVideo"),

        getMainContent(false, false),

        {
          label: "Component",
          name: "component",
          widget: "list",

          types: [
            textImage,
            fullWidthText,
            fullWidthVideo,
            multipleImages,

            {
              label: "Page list",
              name: "PageList",
              widget: "object",
              hint: "This is the list you would like to show on the page",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                  default: "Header text - "
                },
                {
                  label: "Show as Featured",
                  name: "featured",
                  widget: "boolean",
                  default: false,
                  required: false
                },

                // The list component which will populate the LIst shown on page
                pageList
              ]
            }
          ]
        }
      ]
    }
  ]
};
