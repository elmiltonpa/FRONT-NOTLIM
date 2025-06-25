import { useCodeMirror } from "../hooks/useCodeMirror";

export default function CodeEditor({setCodigo, codigo}: { setCodigo: React.Dispatch<React.SetStateAction<string>>, codigo:string }) {
  const ref = useCodeMirror({ value: codigo, onChange: setCodigo });

  return (
    <div
      ref={ref}
      className="border border-gray-300"
      style={{
        minHeight: "200px",
        width: "100%",
        textAlign: "left",
        overflow: "auto",
        fontFamily: "monospace",
        fontSize: "14px"
      }}
    />
  );
}