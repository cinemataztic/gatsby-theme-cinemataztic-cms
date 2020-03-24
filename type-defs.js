exports.typeDefs = `
"""
Settings
"""
type MetaYaml implements Node @dontInfer {
  id: ID!
  og_title: String!
  og_description: String!
  og_type: String!
  og_image: String!
}

"""
Footer
"""
type FooterYaml implements Node @dontInfer {
  id: ID!
  title: String
  headline: String
  description: String
  componentType: String
  facebookLink: String
  instagramLink: String
  linkedinLink: String
  footerColumn: [FooterColumn]
}

"""
FooterColum
"""
type FooterColumn implements Node @dontInfer {
  id: ID!
  size: String
  columnTitle: String
  footerItem: [FooterItem]
}

"""
FooterItem
"""
type FooterItem implements Node @dontInfer {
  id: ID!
  title: String!
  url: String
}

"""
Page
"""
type PagesYaml implements Node @dontInfer {
  id: ID!
  uuid: ID!
  title: String!
  slug: String!
  coverImage: File @fileByAbsolutePath(path: "content/img")
  backgroundImage: File @fileByAbsolutePath(path: "content/img")
  navigation: Navigation
  mainContent: mainContent!
  component: [Component]
}

"""
Navigation
"""
type Navigation implements Node @dontInfer {
  id: ID!
  priority: Int!
  title: String!
}

"""
Main Content
"""
type mainContent implements Node @dontInfer {
  header: String!
  color: color!
}

"""
Color
"""
type color implements Node @dontInfer {
  backgroundColor: String
  textColor: String
} 

"""
Component
"""
type Component implements Node @dontInfer {
  placement: Boolean
  text: String
  title: String
  type: String
  listContent: [String]
  featured: Boolean
  size: String
  textAlign: String
  hideControls: Boolean
  listContent: [String]
  pageLink: PageLink
  images: [MultipleItemImage]
  fullWidthVideo: File @fileByAbsolutePath(path: "content/img")
  largeVideoUrl: String
  autoplay: Boolean
  textVideoImage: File @fileByAbsolutePath(path: "content/img")
  shortTextVideo: File @fileByAbsolutePath(path: "content/img")
  textImage: File @fileByAbsolutePath(path: "content/img")
  fullWidthImage: File @fileByAbsolutePath(path: "content/img")
  fullWidthVideoImage: File @fileByAbsolutePath(path: "content/img")
}

"""
PageLink
"""
type PageLink implements Node @dontInfer {
  btnTxt: String
  externalLink: String
  link: String
  sublink: String
}

"""
MultipleItemImage
"""
type MultipleItemImage implements Node @dontInfer {
  multipleItemImage: File @fileByAbsolutePath(path: "content/img")
}

`;
