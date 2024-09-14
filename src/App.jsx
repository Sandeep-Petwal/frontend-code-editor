import { useEffect, useState } from "react";
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";

function App() {
  const htmlPreWritten = `<h1 > sandeepprasad.tech </h1>`;

  const cssPreWritten = `h1{
    text-align : center;
    animation: slideIn 2s ease-in-out;
  }
  @keyframes slideIn {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  html{
    background-color:black;
    color: white;
  }
  `;

  const jsPreWritten = `console.log("Hi there !");`;

  const [html, setHtml] = useLocalStorage("html", htmlPreWritten);
  const [css, setCss] = useLocalStorage("css", cssPreWritten);
  const [js, setJs] = useLocalStorage("js", jsPreWritten);
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    let timeout = setTimeout(() => {
      let srcDoc = `<html><body>${html}</body><style>${css}</style><script>${js}</script></html> `;
      setSrcDoc(srcDoc);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* top section */}
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>

      {/* bottom section  */}
      <div className="pane bottom-page">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      <Footer />
    </>
  );
}

export default App;
