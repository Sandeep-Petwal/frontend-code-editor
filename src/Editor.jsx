/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faExpandAlt,
  faCopy,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

function Editor(props) {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("Successfully copied !");
      })
      .catch(() => {
        alert("can not copy");
      });
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    let fileName;
    if (displayName === "HTML") {
      fileName = "index.html";
    } else if (displayName === "CSS") {
      fileName = "style.css";
    } else if (displayName === "JavaScript") {
      fileName = "script.js";
    }else{
        fileName = "aknown.txt";
    }
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <div className={`editor-container ${!open && "collapsed"}`}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="editor-title">
        {displayName}

        <div className="buttons">
          {/* download button  */}
          <button
            title={`Download ${displayName} file`}
            type="button"
            onClick={() => {
              handleDownload();
            }}
          >
            <FontAwesomeIcon
              className="icons donload-icon"
              size="s"
              icon={open && faFileDownload}
            />
          </button>

          {/* copy button  */}
          <button
            title={`copy ${displayName} code`}
            type="button"
            onClick={() => {
              copyToClipboard();
            }}
          >
            <FontAwesomeIcon
              className="icons copy-icon"
              size="s"
              icon={open && faCopy}
            />
          </button>

          {/* expend button  */}
          <button
            type="button"
            className="expand-collapse-btn"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <FontAwesomeIcon
              size="s"
              className="icons"
              icon={open ? faCompressAlt : faExpandAlt}
            />
          </button>
        </div>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "material",
        }}
      />
    </div>
  );
}

export default Editor;
