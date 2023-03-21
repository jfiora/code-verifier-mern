import React from 'react';
import './styles/mainStyles.scss';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';

// load all highlight.js languages
import { lowlight } from 'lowlight/lib/common';

import CodeBlock from './CodeBlock';

const MenuBar = ({ editor }: any) => {
    if (!editor) {
        return null;
    }

    return (
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
            code block
        </button>
    );
};

const TipTapEditor = () => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlock);
                },
            }).configure({ lowlight }),
        ],
        content: `
        // Add your code
      `,
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTapEditor;
