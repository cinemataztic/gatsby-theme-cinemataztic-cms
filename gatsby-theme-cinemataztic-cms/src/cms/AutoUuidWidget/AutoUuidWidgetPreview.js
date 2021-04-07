// Preview component - src/components/customWidget/CustomWidgetPreview.js
import React from 'react';

export const AutoUuidWidgetPreview = (props) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.value }} />
    );
}