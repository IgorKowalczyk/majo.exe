import { MDXComponents } from "mdx/types";
import { HTMLAttributes } from "react";

function normalize(text: string) {
 return text
  .toString()
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-") // Replace all non-word chars with -
  .replace(/\s+/g, "-") // Replace spaces with -
  .replace(/&/g, "-and-") // Replace & with 'and'

  .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
  .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
 children: React.ReactNode;
}

/* eslint-disable-next-line @eslint-react/hooks-extra/no-useless-custom-hooks */
export function useMDXComponents(components: MDXComponents) {
 return {
  ...components,
  /* eslint-disable react-a11y/heading-has-content */
  h1: (props: HeadingProps) => <h1 {...props} id={normalize(props.children as string)} />,
  h2: (props: HeadingProps) => <h2 {...props} id={normalize(props.children as string)} />,
  h3: (props: HeadingProps) => <h3 {...props} id={normalize(props.children as string)} />,
  h4: (props: HeadingProps) => <h4 {...props} id={normalize(props.children as string)} />,
  h5: (props: HeadingProps) => <h5 {...props} id={normalize(props.children as string)} />,
  /* eslint-enable react-a11y/heading-has-content */
 };
}
