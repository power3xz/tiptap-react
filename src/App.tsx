import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import "./App.css";

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
  return <EditorContent editor={editor} />;
}

export default App;
