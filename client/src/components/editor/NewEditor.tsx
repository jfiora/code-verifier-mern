import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import theme from 'prism-react-renderer/themes/nightOwl';
import { jsx } from '@emotion/react';

const codeSnippet = `
    import axios from 'axios';

    const getUser = () => {
        return axios.get('https://randomuser.me/api');
    }
`;

const styles: any = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...theme.plain,
    },
};
const languages: Language[] = ['tsx', 'jsx', 'python', 'json', 'sql'];

const HighlightElement = (code: string, lang: any) => (
    <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={languages[0]}
    >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </>
        )}
    </Highlight>
);

export const NewEditor = () => {
    const [code, setCode] = useState(codeSnippet);
    const [languageSelected, setLanguageSelected] = useState(languages[0]);
    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };
    const handleLanguageChange = (newLang: any) => {
        setLanguageSelected(newLang);
    };

    return (
        <div>
            <select>
                {languages.map((language, index) => (
                    <option
                        onChange={(value) => handleLanguageChange(value)}
                        key={index}
                        value={language}
                    >
                        {language}
                    </option>
                ))}
            </select>
            <Editor
                value={code}
                onValueChange={handleCodeChange}
                highlight={HighlightElement}
                padding={10}
                style={styles.root}
            />
        </div>
    );
};
