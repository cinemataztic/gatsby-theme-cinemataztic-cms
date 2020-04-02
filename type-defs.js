exports.getTypeDefs = contentPath => `
"""
Settings
"""
type GeneralYaml implements Node @dontInfer {
  id: ID!
  pageTitle: String!
  favicon: File @fileByAbsolutePath(path: "${contentPath}/media")
  logo: File @fileByAbsolutePath(path: "${contentPath}/media")
  logoSmall: File @fileByAbsolutePath(path: "${contentPath}/media")
}

type MetaYaml implements Node @dontInfer {
  id: ID!
  og_title: String!
  og_description: String!
  og_type: String!
  og_image: String!
  facebookLink: String
  instagramLink: String
  linkedinLink: String
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
FrontPage
"""
type FrontpageYaml implements Node @dontInfer {
  id: ID!
  title: String
  backgroundVideo: File @fileByAbsolutePath(path: "${contentPath}/media")
  mainContent: MainContent!
  component: [Component]
}

"""
Page
"""
type PagesYaml implements Node @dontInfer {
  id: ID!
  uuid: ID!
  parentPage: PagesYaml @link(by: "uuid")
  title: String!
  slug: String!
  coverImage: File @fileByAbsolutePath(path: "${contentPath}/media")
  coverVideo: File @fileByAbsolutePath(path: "${contentPath}/media")
  backgroundVideo: File @fileByAbsolutePath(path: "${contentPath}/media")
  backgroundImage: File @fileByAbsolutePath(path: "${contentPath}/media")
  navigation: Navigation
  featuredContent: FeaturedContent
  mainContent: MainContent!
  component: [Component]
  previousPage: PagesYaml @link(by: "uuid")
  nextPage: PagesYaml @link(by: "uuid")
}

"""
FeaturedContent
"""
type FeaturedContent implements Node @dontInfer {
  title: String
  description: String
  image: File @fileByAbsolutePath(path: "${contentPath}/media")
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
type MainContent implements Node @dontInfer {
  header: String!
  subhead: String
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
  featured: Boolean
  size: String
  textAlign: String
  hideControls: Boolean
  listContent: [PagesYaml] @link(by: "uuid")
  pageLink: PageLink
  images: [MultipleItemImage]
  fullWidthVideo: File @fileByAbsolutePath(path: "${contentPath}/media")
  largeVideoUrl: String
  autoplay: Boolean
  textVideoImage: File @fileByAbsolutePath(path: "${contentPath}/media")
  shortTextVideo: File @fileByAbsolutePath(path: "${contentPath}/media")
  textImage: File @fileByAbsolutePath(path: "${contentPath}/media")
  fullWidthImage: File @fileByAbsolutePath(path: "${contentPath}/media")
  fullWidthVideoImage: File @fileByAbsolutePath(path: "${contentPath}/media")
}

"""
PageLink
"""
type PageLink implements Node @dontInfer {
  btnTxt: String
  externalLink: String
  page: PagesYaml @link(by: "uuid")
}

"""
MultipleItemImage
"""
type MultipleItemImage implements Node @dontInfer {
  multipleItemImage: File @fileByAbsolutePath(path: "${contentPath}/media")
}

`;
