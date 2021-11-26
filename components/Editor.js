import React from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const stringifyJSON = function(json) {
  
}

const Editor = ({ value = "", onUpdate = undefined }) => {
  const editor = React.useRef(null);

  React.useEffect(() => {
    const currentEditor = editor.current;

    const extensions = [basicSetup, oneDark, javascript()];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    console.log(value)
    const state = EditorState.create({
      doc: JSON.stringify(value, null, 2),
      extensions
    });
    const view = new EditorView({ state, parent: currentEditor });

    return () => view.destroy();
  }, [editor, value]);

  return <div ref={editor} />;
};

export default Editor;