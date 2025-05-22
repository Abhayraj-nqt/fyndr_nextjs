"use client";

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  BlockTypeSelect,
  InsertCodeBlock,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  ListsToggle,
  linkDialogPlugin,
  CreateLink,
  InsertImage,
  InsertTable,
  tablePlugin,
  imagePlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  Separator,
  InsertThematicBreak,
  diffSourcePlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import { Ref } from "react";

import "@mdxeditor/editor/style.css";

const editorStyles = `
  .mdxeditor h1 {
    font-size: 2em;
    font-weight: bold;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
  }
  .mdxeditor h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
  }
  .mdxeditor h3 {
    font-size: 1.17em;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .mdxeditor h4 {
    font-size: 1em;
    font-weight: bold;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
  }
  .mdxeditor h5 {
    font-size: 0.83em;
    font-weight: bold;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
  }
  .mdxeditor h6 {
    font-size: 0.67em;
    font-weight: bold;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
  }
  /* List styles to ensure visibility */
  .mdxeditor ul {
    list-style-type: disc;
    padding-left: 2em;
    margin: 1em 0;
  }
  .mdxeditor ol {
    list-style-type: decimal;
    padding-left: 2em;
    margin: 1em 0;
  }
  .mdxeditor li {
    margin: 0.5em 0;
  }
  /* Nested list styles */
  .mdxeditor ul ul, .mdxeditor ol ul {
    list-style-type: circle;
  }
  .mdxeditor ul ul ul, .mdxeditor ol ul ul, .mdxeditor ol ol ul, .mdxeditor ul ol ul {
    list-style-type: square;
  }
  /* Checklist styles */
  .mdxeditor .checked {
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

interface Props {
  value: string;
  editorRef: Ref<MDXEditorMethods> | null;
  fieldChange: (value: string) => void;
}

const Editor = ({ value, editorRef, fieldChange }: Props) => {
  return (
    <>
      {/* Add the custom styles */}
      <style>{editorStyles}</style>

      <MDXEditor
        markdown={value}
        ref={editorRef}
        onChange={fieldChange}
        className="grid w-full border-2 bg-white"
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
          listsPlugin({
            checkboxOptions: {
              checkedClassName: "checked",
              removedClassName: "removed",
            },
            maxNestingLevel: 5,
          }),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: "js",
          }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: "css",
              txt: "txt",
              sql: "sql",
              html: "html",
              sass: "sass",
              scss: "scss",
              bash: "bash",
              json: "json",
              js: "javascript",
              ts: "typescript",
              "": "unspecified",
              tsx: "TypeScript (React)",
              jsx: "JavaScript (React)",
            },
            autoLoadLanguageSupport: true,
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <Separator />
                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
          diffSourcePlugin({
            viewMode: "rich-text",
            diffMarkdown: value || " ",
          }),
        ]}
      />
    </>
  );
};

export default Editor;

// "use client";

// import {
//   MDXEditor,
//   UndoRedo,
//   BoldItalicUnderlineToggles,
//   toolbarPlugin,
//   CodeToggle,
//   BlockTypeSelect,
//   InsertCodeBlock,
//   codeBlockPlugin,
//   headingsPlugin,
//   listsPlugin,
//   linkPlugin,
//   quotePlugin,
//   markdownShortcutPlugin,
//   ListsToggle,
//   linkDialogPlugin,
//   CreateLink,
//   InsertImage,
//   InsertTable,
//   tablePlugin,
//   imagePlugin,
//   codeMirrorPlugin,
//   ConditionalContents,
//   ChangeCodeMirrorLanguage,
//   Separator,
//   InsertThematicBreak,
//   diffSourcePlugin,
//   MDXEditorMethods,
// } from "@mdxeditor/editor";
// import { Ref, useState, useCallback } from "react";

// import "@mdxeditor/editor/style.css";

// // Custom CSS for the editor to handle the font styling
// const editorStyles = `
//   .mdxeditor h1 {
//     font-size: 2em;
//     font-weight: bold;
//     margin-top: 0.67em;
//     margin-bottom: 0.67em;
//   }
//   .mdxeditor h2 {
//     font-size: 1.5em;
//     font-weight: bold;
//     margin-top: 0.83em;
//     margin-bottom: 0.83em;
//   }
//   .mdxeditor h3 {
//     font-size: 1.17em;
//     font-weight: bold;
//     margin-top: 1em;
//     margin-bottom: 1em;
//   }
//   .mdxeditor h4 {
//     font-size: 1em;
//     font-weight: bold;
//     margin-top: 1.33em;
//     margin-bottom: 1.33em;
//   }
//   .mdxeditor h5 {
//     font-size: 0.83em;
//     font-weight: bold;
//     margin-top: 1.67em;
//     margin-bottom: 1.67em;
//   }
//   .mdxeditor h6 {
//     font-size: 0.67em;
//     font-weight: bold;
//     margin-top: 2.33em;
//     margin-bottom: 2.33em;
//   }
//   /* List styles to ensure visibility */
//   .mdxeditor ul {
//     list-style-type: disc;
//     padding-left: 2em;
//     margin: 1em 0;
//   }
//   .mdxeditor ol {
//     list-style-type: decimal;
//     padding-left: 2em;
//     margin: 1em 0;
//   }
//   .mdxeditor li {
//     margin: 0.5em 0;
//   }
//   /* Nested list styles */
//   .mdxeditor ul ul, .mdxeditor ol ul {
//     list-style-type: circle;
//   }
//   .mdxeditor ul ul ul, .mdxeditor ol ul ul, .mdxeditor ol ol ul, .mdxeditor ul ol ul {
//     list-style-type: square;
//   }
//   /* Checklist styles */
//   .mdxeditor .checked {
//     text-decoration: line-through;
//     opacity: 0.7;
//   }

//   /* Custom font family classes */
//   .font-arial {
//     font-family: Arial, sans-serif !important;
//   }
//   .font-times {
//     font-family: 'Times New Roman', Times, serif !important;
//   }
//   .font-courier {
//     font-family: 'Courier New', Courier, monospace !important;
//   }
//   .font-georgia {
//     font-family: Georgia, serif !important;
//   }
//   .font-verdana {
//     font-family: Verdana, Geneva, sans-serif !important;
//   }
//   .font-helvetica {
//     font-family: Helvetica, Arial, sans-serif !important;
//   }

//   /* Custom font size classes */
//   .font-size-small {
//     font-size: 0.875rem !important;
//   }
//   .font-size-normal {
//     font-size: 1rem !important;
//   }
//   .font-size-medium {
//     font-size: 1.125rem !important;
//   }
//   .font-size-large {
//     font-size: 1.25rem !important;
//   }
//   .font-size-xlarge {
//     font-size: 1.5rem !important;
//   }
//   .font-size-xxlarge {
//     font-size: 2rem !important;
//   }
// `;

// // Define font families with class names
// const fontFamilies = [
//   { name: "Default", className: "" },
//   { name: "Arial", className: "font-arial" },
//   { name: "Times New Roman", className: "font-times" },
//   { name: "Courier New", className: "font-courier" },
//   { name: "Georgia", className: "font-georgia" },
//   { name: "Verdana", className: "font-verdana" },
//   { name: "Helvetica", className: "font-helvetica" },
// ];

// // Define font sizes with class names
// const fontSizes = [
//   { name: "Default", className: "" },
//   { name: "Small", className: "font-size-small" },
//   { name: "Normal", className: "font-size-normal" },
//   { name: "Medium", className: "font-size-medium" },
//   { name: "Large", className: "font-size-large" },
//   { name: "X-Large", className: "font-size-xlarge" },
//   { name: "XX-Large", className: "font-size-xxlarge" },
// ];

// // Create a custom toolbar component for font family selection
// const FontFamilySelector = () => {
//   const [currentFont, setCurrentFont] = useState("");

//   const handleFontChange = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const newFontClass = e.target.value;
//       setCurrentFont(newFontClass);

//       // Apply the font class to the contenteditable area
//       const editorContent = document.querySelector(
//         '.mdxeditor [contenteditable="true"]'
//       );
//       if (editorContent && window.getSelection) {
//         const selection = window.getSelection();
//         if (selection && selection.rangeCount > 0) {
//           // Get the selected range
//           const range = selection.getRangeAt(0);
//           if (!range.collapsed) {
//             // Create a wrapper span with the font class
//             const span = document.createElement("span");

//             // Remove any previous font family classes
//             fontFamilies.forEach((font) => {
//               if (font.className) {
//                 span.classList.remove(font.className);
//               }
//             });

//             // Add the new font class if it's not the default
//             if (newFontClass) {
//               span.className = newFontClass;
//             }

//             // Clone the range contents and add to the span
//             span.appendChild(range.extractContents());
//             range.insertNode(span);

//             // Restore the selection
//             selection.removeAllRanges();
//             selection.addRange(range);
//           }
//         }
//       }
//     },
//     []
//   );

//   return (
//     <div className="font-family-selector" style={{ marginRight: "8px" }}>
//       <select
//         value={currentFont}
//         onChange={handleFontChange}
//         style={{
//           padding: "4px 8px",
//           borderRadius: "4px",
//           border: "1px solid #ddd",
//           background: "#fff",
//           minWidth: "120px",
//           height: "32px",
//         }}
//         title="Font Family"
//       >
//         {fontFamilies.map((font) => (
//           <option
//             key={font.className}
//             value={font.className}
//             className={font.className}
//           >
//             {font.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// // Create a custom toolbar component for font size selection
// const FontSizeSelector = () => {
//   const [currentSize, setCurrentSize] = useState("");

//   const handleSizeChange = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const newSizeClass = e.target.value;
//       setCurrentSize(newSizeClass);

//       // Apply the font size class to the contenteditable area
//       const editorContent = document.querySelector(
//         '.mdxeditor [contenteditable="true"]'
//       );
//       if (editorContent && window.getSelection) {
//         const selection = window.getSelection();
//         if (selection && selection.rangeCount > 0) {
//           // Get the selected range
//           const range = selection.getRangeAt(0);
//           if (!range.collapsed) {
//             // Create a wrapper span with the font size class
//             const span = document.createElement("span");

//             // Remove any previous font size classes
//             fontSizes.forEach((size) => {
//               if (size.className) {
//                 span.classList.remove(size.className);
//               }
//             });

//             // Add the new size class if it's not the default
//             if (newSizeClass) {
//               span.className = newSizeClass;
//             }

//             // Clone the range contents and add to the span
//             span.appendChild(range.extractContents());
//             range.insertNode(span);

//             // Restore the selection
//             selection.removeAllRanges();
//             selection.addRange(range);
//           }
//         }
//       }
//     },
//     []
//   );

//   return (
//     <div className="font-size-selector" style={{ marginRight: "8px" }}>
//       <select
//         value={currentSize}
//         onChange={handleSizeChange}
//         style={{
//           padding: "4px 8px",
//           borderRadius: "4px",
//           border: "1px solid #ddd",
//           background: "#fff",
//           minWidth: "90px",
//           height: "32px",
//         }}
//         title="Font Size"
//       >
//         {fontSizes.map((size) => (
//           <option key={size.className} value={size.className}>
//             {size.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// // Custom hook to initialize font styling on editor load
// const useFontStylingSetup = () => {
//   useState(() => {
//     // Function to initialize editor with custom font styling capabilities
//     const setupEditorFontHandling = () => {
//       // Monitor for editor initialization
//       const observer = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//           if (mutation.addedNodes.length > 0) {
//             // Find the contenteditable element
//             const editor = document.querySelector(
//               '.mdxeditor [contenteditable="true"]'
//             );
//             if (editor) {
//               // We found the editor, disconnect observer
//               observer.disconnect();

//               // Add paste event handler to preserve styling
//               editor.addEventListener("paste", (e) => {
//                 // Let the default paste happen but process it after
//                 setTimeout(() => {
//                   // Process pasted content if needed
//                 }, 0);
//               });
//             }
//           }
//         });
//       });

//       // Start observing the document for the editor to be added
//       observer.observe(document.body, { childList: true, subtree: true });
//     };

//     // Initialize after a short delay to ensure DOM is ready
//     setTimeout(setupEditorFontHandling, 100);
//   }, []);
// };

// interface Props {
//   value: string;
//   editorRef: Ref<MDXEditorMethods> | null;
//   fieldChange: (value: string) => void;
// }

// const Editor = ({ value, editorRef, fieldChange }: Props) => {
//   // Initialize font styling setup
//   useFontStylingSetup();

//   return (
//     <>
//       {/* Add the custom styles */}
//       <style>{editorStyles}</style>

//       <MDXEditor
//         markdown={value}
//         ref={editorRef}
//         onChange={fieldChange}
//         className="grid w-full border-2 bg-white"
//         contentEditableClassName="prose max-w-full"
//         plugins={[
//           headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
//           listsPlugin({
//             checkboxOptions: {
//               checkedClassName: "checked",
//               removedClassName: "removed",
//             },
//             maxNestingLevel: 5,
//           }),
//           linkPlugin(),
//           linkDialogPlugin(),
//           quotePlugin(),
//           markdownShortcutPlugin(),
//           tablePlugin(),
//           imagePlugin(),
//           codeBlockPlugin({
//             defaultCodeBlockLanguage: "js",
//           }),
//           codeMirrorPlugin({
//             codeBlockLanguages: {
//               css: "css",
//               txt: "txt",
//               sql: "sql",
//               html: "html",
//               sass: "sass",
//               scss: "scss",
//               bash: "bash",
//               json: "json",
//               js: "javascript",
//               ts: "typescript",
//               "": "unspecified",
//               tsx: "TypeScript (React)",
//               jsx: "JavaScript (React)",
//             },
//             autoLoadLanguageSupport: true,
//           }),
//           toolbarPlugin({
//             toolbarContents: () => (
//               <ConditionalContents
//                 options={[
//                   {
//                     when: (editor) => editor?.editorType === "codeblock",
//                     contents: () => <ChangeCodeMirrorLanguage />,
//                   },
//                   {
//                     fallback: () => (
//                       <>
//                         <UndoRedo />
//                         <Separator />
//                         {/* Custom font controls */}
//                         <FontFamilySelector />
//                         <FontSizeSelector />
//                         <Separator />
//                         <BoldItalicUnderlineToggles />
//                         <CodeToggle />
//                         <Separator />
//                         <BlockTypeSelect />
//                         <ListsToggle />
//                         <Separator />
//                         <CreateLink />
//                         <InsertImage />
//                         <Separator />
//                         <InsertTable />
//                         <InsertThematicBreak />
//                         <Separator />
//                         <InsertCodeBlock />
//                       </>
//                     ),
//                   },
//                 ]}
//               />
//             ),
//           }),
//           diffSourcePlugin({
//             viewMode: "rich-text",
//             diffMarkdown: value || " ",
//           }),
//         ]}
//       />
//     </>
//   );
// };

// export default Editor;
