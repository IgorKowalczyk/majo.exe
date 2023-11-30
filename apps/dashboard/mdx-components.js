function normalize(text) {
 return (
  text
   .toString()
   .trim()
   .toLowerCase()
   .replace(/[^a-z0-9]+/g, "-") // Replace all non-word chars with -
   .replace(/\s+/g, "-") // Replace spaces with -
   .replace(/&/g, "-and-") // Replace & with 'and'
   /* eslint-disable no-useless-escape */
   .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
   .replace(/\-\-+/g, "-") // Replace multiple - with single -
  /* eslint-enable no-useless-escape */
 );
}

export function useMDXComponents(components) {
 return {
  ...components,
  h1: (props) => <h1 {...props} id={normalize(props.children)} />,
  h2: (props) => <h2 {...props} id={normalize(props.children)} />,
  h3: (props) => <h3 {...props} id={normalize(props.children)} />,
  h4: (props) => <h4 {...props} id={normalize(props.children)} />,
  h5: (props) => <h5 {...props} id={normalize(props.children)} />,
 };
}
