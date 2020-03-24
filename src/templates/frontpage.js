import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const HomeTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allPagesYaml(sort: { fields: title, order: ASC }) {
        nodes {
          id
          uuid
          title
          slug
        }
      }
    }
  `);

  const pages = data.allPagesYaml.nodes;

  return (
    <>
      Index
      {JSON.stringify(pages, null, 2)}
    </>
  );
};

export default HomeTemplate;
