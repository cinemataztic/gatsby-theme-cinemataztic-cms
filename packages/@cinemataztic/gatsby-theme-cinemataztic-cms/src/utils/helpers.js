exports.getPagePreviewData = page => {
    const { mainContent, featuredContent, backgroundImage, slug } = page;
    const previewData = {
        title: null,
        description: null,
        image: backgroundImage || null,
        slug
    };

    if (mainContent) {
        if (mainContent.header) {
            previewData.title = mainContent.header;
        }
        if (mainContent.subhead) {
            previewData.description = mainContent.subhead;
        }
    }

    if (featuredContent) {
        if (featuredContent.title) {
            previewData.title = featuredContent.title;
        }
        if (featuredContent.image) {
            previewData.image = featuredContent.image;
        }
        if (featuredContent.description) {
            previewData.description = featuredContent.description;
        }
    }

    return previewData;

}