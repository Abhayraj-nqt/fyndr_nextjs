"use client";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Undo2,
  Redo2,
  Indent,
  Outdent,
  Image,
  Table,
  Baseline,
  PaintBucket,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  alignLeft: boolean;
  alignCenter: boolean;
  alignRight: boolean;
  alignJustify: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}

interface ToolbarSelectProps {
  onChange: (value: string) => void;
  options: SelectOption[];
  defaultValue?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface LexicalEditorProps {
  onChange?: (html: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

const CustomEditor: React.FC<LexicalEditorProps> = ({
  onChange,
  value = "",
  placeholder = "Start typing...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateHtmlContent = (): void => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      onChange?.(html);
    }
  };

  // Handle input changes
  const handleInput = (): void => {
    updateHtmlContent();
    updateActiveFormats();
  };

  // Update active format states
  const updateActiveFormats = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikethrough: document.queryCommandState("strikethrough"),
        alignLeft: document.queryCommandState("justifyLeft"),
        alignCenter: document.queryCommandState("justifyCenter"),
        alignRight: document.queryCommandState("justifyRight"),
        alignJustify: document.queryCommandState("justifyFull"),
      });
    }
  };

  // Handle selection change
  const handleSelectionChange = (): void => {
    updateActiveFormats();
  };

  // Add event listener for selection changes
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // Format text commands
  const formatText = (command: string, value: string | null = null): void => {
    document.execCommand(command, false, value || undefined);
    editorRef.current?.focus();
    updateHtmlContent();
    updateActiveFormats();
  };

  const insertHTML = (html: string): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const fragment = range.createContextualFragment(html);
      range.insertNode(fragment);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    updateHtmlContent();
  };

  const handleBlockFormat = (format: string): void => {
    switch (format) {
      case "h1":
        formatText("formatBlock", "<h1>");
        break;
      case "h2":
        formatText("formatBlock", "<h2>");
        break;
      case "h3":
        formatText("formatBlock", "<h3>");
        break;
      case "p":
        formatText("formatBlock", "<p>");
        break;
      case "blockquote":
        formatText("formatBlock", "<blockquote>");
        break;
      case "pre":
        formatText("formatBlock", "<pre>");
        break;
      default:
        formatText("formatBlock", "<p>");
    }
  };

  const insertLink = (): void => {
    const url = prompt("Enter URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const insertImage = (): void => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertHTML(
        `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`
      );
    }
  };

  const insertTable = (): void => {
    const rowsInput = prompt("Number of rows:");
    const colsInput = prompt("Number of columns:");

    const rows = parseInt(rowsInput || "3");
    const cols = parseInt(colsInput || "3");

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      alert("Please enter valid numbers for rows and columns");
      return;
    }

    let tableHTML =
      '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;"><tbody>';

    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHTML +=
          '<td style="border: 1px solid #ccc; padding: 8px;">Cell</td>';
      }
      tableHTML += "</tr>";
    }

    tableHTML += "</tbody></table>";
    insertHTML(tableHTML);
  };

  const handleColorChange =
    (type: "foreColor" | "hiliteColor") =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      formatText(type, event.target.value);
    };

  // Handle key events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // Handle Ctrl+Z (Undo) and Ctrl+Y (Redo)
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case "z":
          if (event.shiftKey) {
            event.preventDefault();
            formatText("redo");
          } else {
            event.preventDefault();
            formatText("undo");
          }
          break;
        case "y":
          event.preventDefault();
          formatText("redo");
          break;
        case "b":
          event.preventDefault();
          formatText("bold");
          break;
        case "i":
          event.preventDefault();
          formatText("italic");
          break;
        case "u":
          event.preventDefault();
          formatText("underline");
          break;
      }
    }
  };

  const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    onClick,
    active = false,
    children,
    title,
  }) => (
    <button
      onClick={onClick}
      className={`toolbar-item ${active ? "active" : ""}`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  const ToolbarSelect: React.FC<ToolbarSelectProps> = ({
    onChange,
    options,
    defaultValue = "p",
  }) => (
    <select
      className="toolbar-item toolbar-select"
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const blockTypeOptions: SelectOption[] = [
    { value: "p", label: "Normal" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "blockquote", label: "Quote" },
    { value: "pre", label: "Code Block" },
  ];

  const fontSizeOptions: SelectOption[] = [
    { value: "1", label: "Small" },
    { value: "3", label: "Normal" },
    { value: "5", label: "Large" },
    { value: "7", label: "Extra Large" },
  ];

  const fontFamilyOptions: SelectOption[] = [
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times" },
    { value: "Courier New", label: "Courier" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
  ];

  return (
    <div className={`editor-container ${className}`}>
      <style jsx>{`
        .editor-container {
          max-width: 900px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
        }

        .toolbar {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          flex-wrap: wrap;
          gap: 4px;
        }

        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .toolbar-divider {
          width: 1px;
          height: 24px;
          background: #dee2e6;
          margin: 0 8px;
        }

        .toolbar-item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          color: #495057;
          font-size: 14px;
        }

        .toolbar-item:hover {
          background: #e9ecef;
        }

        .toolbar-item.active {
          background: #007bff;
          color: white;
        }

        .toolbar-select {
          min-width: 100px;
          height: 32px;
          padding: 0 8px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          background: white;
          font-size: 14px;
        }

        .editor-content {
          min-height: 400px;
          padding: 20px;
          font-size: 16px;
          line-height: 1.6;
          outline: none;
          border: none;
          background: white;
        }

        .editor-content:empty::before {
          content: "${placeholder}";
          color: #6c757d;
          font-style: italic;
        }

        .editor-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .editor-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .editor-content h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .editor-content p {
          margin: 0.5em 0;
        }

        .editor-content blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 4px solid #007bff;
          color: #6c757d;
          font-style: italic;
        }

        .editor-content pre {
          background: #f8f9fa;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          font-family: "Courier New", monospace;
          margin: 1em 0;
        }

        .editor-content ul,
        .editor-content ol {
          margin: 0.5em 0;
          padding-left: 2em;
        }

        .editor-content li {
          margin: 0.25em 0;
        }

        .editor-content a {
          color: blue;
          text-decoration: underline;
        }

        .editor-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
        }

        .editor-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        .editor-content td,
        .editor-content th {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }

        .editor-content th {
          background-color: #f8f9fa;
          font-weight: bold;
        }

        .html-output {
          margin-top: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .html-output h3 {
          margin: 0 0 12px 0;
          color: #495057;
          font-size: 1.1em;
        }

        .html-output pre {
          background: white;
          padding: 16px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          overflow-x: auto;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .color-picker {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          padding: 0;
        }
        .color-picker-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
          cursor: pointer;

          input[type="color"] {
            width: 28px;
            height: 28px;
            border: none;
            padding: 0;
            background: transparent;
            cursor: pointer;
          }
      `}</style>

      {/* Toolbar */}
      <div className="toolbar">
        {/* Undo/Redo */}
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => formatText("undo")}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("redo")}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={18} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Block Format */}
        <div className="toolbar-group">
          <ToolbarSelect
            onChange={handleBlockFormat}
            options={blockTypeOptions}
          />
        </div>

        <div className="toolbar-divider" />

        {/* Font Controls */}
        <div className="toolbar-group">
          <ToolbarSelect
            onChange={(value) => formatText("fontName", value)}
            options={fontFamilyOptions}
          />
          <ToolbarSelect
            onChange={(value) => formatText("fontSize", value)}
            options={fontSizeOptions}
          />
        </div>

        <div className="toolbar-divider" />

        {/* Text Formatting */}
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => formatText("bold")}
            active={activeFormats.bold}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("italic")}
            active={activeFormats.italic}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("underline")}
            active={activeFormats.underline}
            title="Underline (Ctrl+U)"
          >
            <Underline size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("strikethrough")}
            active={activeFormats.strikethrough}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Colors */}
        <div className="toolbar-group">
          <label className="color-picker-wrapper" title="Text Color">
            <Baseline />
            <input
              type="color"
              className="color-picker"
              onChange={handleColorChange("foreColor")}
              title="Text Color"
            />
          </label>
          <label className="color-picker-wrapper" title="Text Color">
            <PaintBucket />
            <input
              type="color"
              className="color-picker"
              onChange={handleColorChange("hiliteColor")}
              title="Background Color"
            />
          </label>
        </div>

        <div className="toolbar-divider" />

        {/* Alignment */}
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => formatText("justifyLeft")}
            active={activeFormats.alignLeft}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("justifyCenter")}
            active={activeFormats.alignCenter}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("justifyRight")}
            active={activeFormats.alignRight}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("justifyFull")}
            active={activeFormats.alignJustify}
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Lists */}
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => formatText("insertUnorderedList")}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("outdent")}
            title="Decrease Indent"
          >
            <Outdent size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatText("indent")}
            title="Increase Indent"
          >
            <Indent size={18} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Insert */}
        <div className="toolbar-group">
          <ToolbarButton onClick={insertLink} title="Insert Link">
            <Link size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert Image">
            <Image size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={insertTable} title="Insert Table">
            <Table size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable="true"
        onInput={handleInput}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
      />
      {/* <div className="html-output">
        <h3>Generated HTML Output:</h3>
        <pre>{htmlContent}</pre>
      </div> */}
    </div>
  );
};

export default CustomEditor;
