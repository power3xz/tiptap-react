import { css } from '@emotion/css';
import {
  Code,
  FormatBold,
  FormatClear,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  HorizontalRule,
  Redo,
  TableChart,
  Undo,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

const componentCss = css`
  text-align: left;
  width: 1080px;
  min-height: 400px;
  margin: 0 auto;
  button.is-active {
    border: 1px solid black;
  }
`;

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        size="small"
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FormatBold />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FormatItalic />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FormatStrikethrough />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Code />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <FormatClear />
      </IconButton>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        대제목
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        소제목
      </Button>
      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FormatListBulleted />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FormatListNumbered />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Code />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <FormatQuote />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <HorizontalRule />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <TableChart />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().undo().run()}>
        <Undo />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().redo().run()}>
        <Redo />
      </IconButton>
    </>
  );
};

export function TiptapEditor() {
  const [state, setState] = useState('<p>Hello World!</p>');
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { HTMLAttributes: { class: 'heading' } },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: state,
    onUpdate: ({ editor }) => {
      setState(editor.getHTML());
    },
  });
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className={componentCss}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
