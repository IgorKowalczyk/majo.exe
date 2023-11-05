function normalize(text) {
 if (typeof text !== "string") return "";
 return text
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)+/g, "");
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
