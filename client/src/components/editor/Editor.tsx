import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';

interface EditorProps {
    language?: any;
    children?: any;
}

export const Editor = ({ language, children }: EditorProps) => {
    const codeExample = `
        (function someDemo() {
            let test = "Hello World!";
            console.log(test);
        })();
        return () => <App />;
    `;

    return (
        <Highlight {...defaultProps} code={codeExample} language='jsx'>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
