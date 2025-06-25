// useCodeMirror.ts
import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

const pokerLanguageCompletions = (context: CompletionContext) => {
  const word = context.matchBefore(/\w*/);
  if (!word || word.from == word.to) return null;

  return {
    from: word.from,
    options: [
      { label: "program", type: "keyword" },
      { label: "while", type: "keyword" },
      { label: "if", type: "keyword" },
      { label: "def", type: "variable" },
      { label: "leer", type: "function" },
      { label: "escribir", type: "function" },
      { label: "else", type: "function" },
      { label: "matriz", type: "function" },
      { label: "real", type: "function" },
      { label: "columnas", type: "function" },
      { label: "filas", type: "function" },
      { label: "tras", type: "function" }
    ]
  };
};


export function useCodeMirror(props: {
  value: string;
  onChange: (val: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const editorView = useRef<EditorView | null>(null);


  useEffect(() => {
    if (!ref.current) return;
  
    const view = new EditorView({
      parent: ref.current,
      doc: props.value,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        autocompletion({ override: [pokerLanguageCompletions] }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            props.onChange(update.state.doc.toString());
          }
        }),
      ],
    });
  
    editorView.current = view;
  
    return () => view.destroy();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = editorView.current;
    if (!view) return;
  
    const currentValue = view.state.doc.toString();
    if (props.value !== currentValue) {
      view.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: props.value,
        }
      });
    }
  }, [props.value]);

  return ref;
}
