import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import github from 'prism-react-renderer/themes/github';
import useDarkMode from 'use-dark-mode';

/* eslint-disable */
const H1 = (props: any) => <h1 className="text-2xl" {...props} />;
export const H2 = (props: any) => (
  <h2 className="relative space-x-4 text-lg mt-8 mb-3" {...props}>
    <span className="absolute left-0 bottom-1 top-1 block w-1 rounded-sm bg-gray-700 font-semibold dark:bg-gray-50" />
    <span className="text-gray-700 dark:text-gray-50">{props.children}</span>
  </h2>
);
const H3 = (props: any) => <h3 className="font-semibold" {...props} />;
const Paragraph = (props: any) => (
  <p className="text-base leading-7 my-3" {...props} />
);
export const UL = (props: any) => (
  <ul style={{ listStyleType: 'circle' }} className="my-3 ml-10" {...props} />
);
const OL = (props: any) => (
  <ol style={{ listStyleType: 'auto' }} className="my-3 ml-10" {...props} />
);
export const LI = (props: any) => <li className="leading-7" {...props} />;
export const A = (props: any) => (
  <a
    className="border-b-2 border-gray-700 text-gray-800 transition-colors duration-75 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-50 dark:border-gray-50"
    {...props}
  />
);
const Code = (props: any) => <code className="rounded-sm" {...props} />;
const Pre = (props: any) => {
  const className = props.children.props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const { value: darkMode } = useDarkMode();

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
      theme={darkMode ? vsDark : github}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} p-4 my-3 rounded overflow-auto text-sm`}
          style={{ ...style }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
const Image = (props: any) => (
  <img className="block my-3 rounded-sm" {...props} />
);

export const components = {
  a: A,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  img: Image,
  li: LI,
  p: Paragraph,
  pre: Pre,
  ol: OL,
  ul: UL,
};
