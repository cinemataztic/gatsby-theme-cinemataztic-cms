//---------------------------------------------------------------------------------------
// READ THIS
//---------------------------------------------------------------------------------------
// It seems that setting "required": false , works but "required": "false" does not

const whiteSpacePattern = [
  "^[^\\s#]+$",
  " - Should not have spaces, #, / - or other wierd stuff "
];
export { whiteSpacePattern };

export const urlPath = {
  label: "Urlpath",
  name: "urlPath",
  widget: "string",
  required: true,
  pattern: whiteSpacePattern,
  hint: "Must be uniq, is used for direct links - there is no need for a slash "
};

const getImage = (label, name) => {
  return {
    label: label,
    name: name,
    widget: "image",
    //"default":      '',
    required: false,
    media_library: {
      config: {
        multiple: false
      }
    }
  };
};

const getVideo = (label, name) => {
  return {
    label: label,
    name: name,
    widget: "file",
    required: false,
    //"default": "",
    pattern: ["(.mp4)", "Must be an .mp4 format"],
    hint: "Please use an MP4 format - max size 10MB"
  };
};

const color = {
  label: "Color",
  name: "color",
  widget: "object",
  fields: [
    {
      label: "background color",
      name: "backgroundColor",
      widget: "string",
      hint: "Express color like #D40000 ",
      default: "",
      required: false,
      pattern: [
        "^[^\\s]+$",
        " - Should not have spaces, #, / - or other wierd stuff "
      ]
    },

    {
      label: "Text color",
      name: "textColor",
      widget: "string",
      hint: "Express color like #D40000 ",
      default: "",
      required: false,
      pattern: [
        "^[^\\s]+$",
        " - Should not have spaces, #, / - or other wierd stuff "
      ]
    }
  ]
};

const getMainContent = (useLogo, showBackgroundColor = true) => {
  const obj = {
    label: "Main Content",
    name: "mainContent",
    widget: "object",
    fields: []
  };

  obj.fields.push({
    label: "header",
    name: "header",
    widget: "string",
    default: "This is the main title text "
  });

  obj.fields.push({
    label: "Subheader ",
    name: "subhead",
    widget: "string",
    default: "This is the subhead text",
    required: false
  });

  /*if(useLogo ) {
		obj.fields.push(
		   {
			   "label":        "Logo",
			   "name":         "logoImage",
			   "widget":       "image",
			   "default":      "",
			   "required":     false,
			   "media_library":{
				   "config":{
					   "multiple":false
				   }
			   }
		   }
		)
	};*/

  /*obj.fields.push(
	   {
		   "label":        "Cover Image",
		   "name":         "coverImage",
		   "widget":       "image",
		   "default":      "",
		   "required":     false,
		   "media_library":{
			   "config":{
				   "multiple":false
			   }
		   }
	   }
	)*/

  /*
		obj.fields.push(
			{
				"label":   "Cover Video",
			   "name":    "coverVideo",
			   "widget":  "file",
			   "required":false,
			   "default": "",
			   "pattern": ["(.mp4)", "Must be an .mp4 format"],
			}
		);*/

  /*obj.fields.push(
	  background
	);*/

  if (showBackgroundColor) {
    obj.fields.push(color);
  }

  return obj;
};

const featuredContent = {
  name: "featuredContent",
  label: "Featured Content",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      default: "",
      required: false,
      hint: "Use @ signs to break text"
    },
    {
      label: "Short Description",
      name: "description",
      widget: "string",
      default: "",
      required: false,
      hint: "short text to show on featured list"
    },
    {
      label: "Featured Image",
      hint: "If no image is set here, we will try images in this order: coverImage -> backgroundImage",
      name: "image",
      widget: "image",
      default: "",
      required: false,
      media_library: {
        config: {
          multiple: false
        }
      }
    }
  ]
};

const navigationContent = {
  name: "navigation",
  label: "Navigation Settings",
  widget: "object",
  fields: [
    {
      label: "Title in Navigation",
      name: "title",
      widget: "string",
      default: "",
      required: false
    },
    {
      label: "view priority",
      name: "priority",
      widget: "number",
      hint: "Higher means more to the left - 0 means not shown",
      required: true,
      default: 0,
      min: 0
    }
  ]
};

const linkBtn = {
  label: "Link to page",
  name: "pageLink",
  required: false,
  widget: "object",
  fields: [
    {
      label: "Button text",
      name: "btnTxt",
      widget: "string",
      required: false,
      default: ""
    },
    {
      label: "Select Page",
      name: "page",
      widget: "relation",
      collection: "pages",
      default: "",
      required: false,
      searchFields: ["title", "slug", "uuid"],
      valueField: "uuid",
      displayFields: ["title", "slug"]
    },
    {
      label: "External link",
      name: "externalLink",
      widget: "string",
      required: false,
      default: ""
    }
  ]
};

export const fullWidthText = {
  label: "Full Width Component",
  name: "FullWidthComponent",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      default: "Header text dummy",
      required: false
    },
    {
      label: "Text",
      name: "text",
      widget: "text",
      default: "some body text",
      required: false
    },
    {
      label: "Use Image",
      name: "placement",
      widget: "boolean",
      default: false
    },

    getImage("Image", "fullWidthImage"),

    {
      label: "Text Alignment",
      name: "textAlign",
      widget: "select",
      required: false,
      multiple: false,
      options: ["left", "center", "right"],
      default: "left"
    },

    {
      label: "Text Width",
      name: "size",
      widget: "select",
      required: false,
      multiple: false,
      options: ["33%", "50%", "66%", "83%", "100%"],
      default: "50%"
    },
    linkBtn
  ]
};

export const textImage = {
  label: "Text Image",
  name: "TextImage",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      default: "Headline"
    },
    {
      label: "Text",
      name: "text",
      widget: "text",
      default: "Lorem ipsum dolor sit amet..."
    },
    {
      label: "image on right-side",
      name: "placement",
      widget: "boolean",
      default: false
    },

    getImage("Image", "textImage"),

    {
      label: "Image Size",
      name: "size",
      widget: "select",
      required: false,
      multiple: false,
      options: ["33%", "50%", "66%", "83%"],
      default: "50%"
    },

    linkBtn
  ]
};

export const iFrame = {
  label: "iFrame",
  name: "iFrame",
  widget: "object",
  fields: [
    {
      label: "URL",
      name: "url",
      widget: "string"
    },
    {
      label: "Text",
      name: "iframeText",
      widget: "string"
    },
    {
      label: "Width",
      name: "width",
      widget: "string"
    }
  ]
};

const textVideo = {
  label: "Text-Video",
  name: "TextVideo",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      default: "Headline"
    },
    {
      label: "Text",
      name: "text",
      widget: "text",
      default: "Lorem ipsum dolor sit amet..."
    },
    {
      label: "Video Size",
      name: "size",
      widget: "select",
      required: false,
      multiple: false,
      options: ["33%", "50%", "66%", "83%"],
      default: "50%"
    },

    /*{
			"label":  "Should video Autoplay",
			"name":   "autoplay",
			"widget": "boolean",
			"required":false,
			"default":false,
			"hint": "Autoplaying videos is only allowed if video is muted"
		},*/

    {
      label: "video on right-side",
      name: "placement",
      widget: "boolean",
      default: false
    },

    getVideo("Video", "shortTextVideo"),
    getImage("image", "textVideoImage"),

    {
      label: "Path to Large Video",
      name: "largeVideoUrl",
      widget: "string",
      default: "",
      required: false,
      hint:
        "Link to large .MP4 format video - the full path including http:// or https://"
    },

    {
      label: "Hide controls",
      name: "hideControls",
      widget: "boolean",
      required: false,
      default: false
    },

    linkBtn
  ]
};

export const fullWidthVideo = {
  label: "Full Width Video",
  name: "FullWidthVideo",
  widget: "object",
  fields: [
    getVideo("Video - will autoplay", "fullWidthVideo"),
    getImage("image", "fullWidthVideoImage"),

    {
      label: "Path to Large Video",
      name: "largeVideoUrl",
      widget: "string",
      default: "",
      required: false,
      hint:
        "Link to large .MP4 format video - the full path including http:// or https://"
    },

    {
      label: "Autoplay large video",
      name: "autoplay",
      widget: "boolean",
      required: false,
      default: false
    },

    {
      label: "Hide controls",
      name: "hideControls",
      widget: "boolean",
      required: false,
      default: false
    }
  ]
};

export const pageList = {
  label: "Select pages which should appear in list...",
  name: "listContent",
  widget: "relation",
  collection: "pages",
  default: "",
  required: false,
  multiple: true,
  searchFields: ["title"],
  valueField: "uuid",
  displayFields: ["title"]
};

/*

export const imageCarousel = {
  "label": "Image-Carousel",
  "name": "ImageCarousel",
  "widget": "list",
  "field": {
    "label": "Image",
    "name": "image",
    "widget": "image",
    "default":      ""
  }
}
*/

export const multipleImages = {
  label: "Multiple Images",
  name: "multipleImages",
  widget: "object",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      default: "Header text ",
      required: false
    },
    {
      label: "Text",
      name: "text",
      widget: "text",
      default: "Some body text",
      required: false
    },

    {
      label: "Image",
      name: "images",
      widget: "list",
      allow_add: true,
      fields: [getImage("image", "multipleItemImage")]
    }
  ]
};

export {
  getMainContent,
  featuredContent,
  linkBtn,
  navigationContent,
  getImage,
  getVideo,
  textVideo
};
