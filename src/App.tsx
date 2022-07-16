import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import "./App.css";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
    </>
  );
};

function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });
  useEffect(() => {
    if (editor) {
      editor.on("update", (a) => {
        console.log(a.editor.getHTML());
      });
    }
  }, [editor]);
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}

export default App;
