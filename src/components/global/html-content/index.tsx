import React from "react";

type Props = {
  htmlString: string;
};

const HtmlContent = ({ htmlString }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default HtmlContent;
