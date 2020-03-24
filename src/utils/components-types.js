/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 23-07-2019.
 */

import React from "react";
import TextImage from "../components/TextImage";
import PageList from "../components/page-list/PageList";
import FullWidthComp from "../components/full-width-comp/FullWidthComp";
import FullWidthVideo from "../components/full-width-video/FullWidthVideo";
import MultipleImages from "../components/multiple-images-comp/MultipleImages";
import TextVideo from "../components/text-video/TextVideo";

const componentFromString = (componentData, index, pageListContent) => {
  const type = componentData.type;

  switch (type) {
    case "TextImage":
      return <TextImage key={index} data={componentData} />;

    case "FullWidthComponent":
      return <FullWidthComp key={index} data={componentData} />;

    case "TextVideo":
      return <TextVideo key={index} data={componentData} />;

    case "PageList":
      return <PageList key={index} data={componentData} />;

    case "FullWidthVideo":
      return <FullWidthVideo key={index} data={componentData} />;

    case "multipleImages":
      return <MultipleImages key={index} data={componentData} />;

    default:
      return <div key={index}>NO component match: {type}</div>;
  }
};

//---------------------------------------------------------------------------------------

const componentFactory = (componentsArr, pageListArr) => {
  if (!componentsArr || componentsArr.length === 0) {
    //console.error (" componentFactory - componentsArr not defined " , componentsArr);
    return [];
  }

  if (!pageListArr) {
    //console.error (" componentFactory - pageListArr not defined " , pageListArr);
  }

  return componentsArr.map((item, index) => {
    // This is how we handle building a list
    if (item.type === "PageList") {
      const pageListContent = pageListArr.filter(page => {
        const pageUrlPath = page.node.frontmatter.urlPath;
        const exist = item.listContent.indexOf(pageUrlPath);
        return exist === -1 ? false : true;
      });

      // We append the content to the markdownRemark query result
      // so we dont have to inject other data into the components
      item.pageListArr = pageListContent;
    }

    return componentFromString(item, index);
  });
};

export default componentFactory;
