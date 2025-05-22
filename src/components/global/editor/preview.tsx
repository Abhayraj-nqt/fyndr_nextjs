import { Code } from "bright";
import { compileMDX } from "next-mdx-remote/rsc";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

export const Preview = async ({ content }: { content: string }) => {
  const formattedContent = content.replace(/\\/g, "").replace(/&#x20;/g, "");

  const { content: MDXContent } = await compileMDX({
    source: formattedContent,
    components: {
      pre: (props: React.HTMLAttributes<HTMLElement>) => (
        <Code {...props} lineNumbers className="shadow-md dark:shadow-lg" />
      ),
    },
  });

  return (
    <section className="markdown prose grid break-words">{MDXContent}</section>
  );
};
