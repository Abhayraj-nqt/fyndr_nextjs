/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DOMPurify from "dompurify";
import {
  convertToRaw,
  EditorState,
  ContentState,
  ContentBlock,
  ContentState as DraftContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useState, forwardRef, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
interface RichTextEditorProps {
  getMarkdownValue: (value: string) => void;
  desc?: string;
}

interface MediaProps {
  block: ContentBlock;
  contentState: DraftContentState;
}

const Media: React.FC<MediaProps> = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  let media = null;

  if (type === "IMAGE") {
    media = <img src={src} alt="media" />;
  } else if (type === "EMBEDDED_LINK") {
    media = <iframe title="embedded media" src={src} frameBorder="0" />;
  } else if (type === "VIDEO_FILE") {
    media = (
      <video controls width="853" height="480">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return media;
};

const RichTextEditor = forwardRef<HTMLDivElement | null, RichTextEditorProps>(
  ({ getMarkdownValue, desc }, ref) => {
    const [value, setValue] = useState(EditorState.createEmpty());
    const latestEditorState = useRef(value);
    const editorWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const isMounted = true;
      if (desc && isMounted) {
        const blocksFromHtml = htmlToDraft(desc);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const newEditorState = EditorState.createWithContent(contentState);
        setValue(newEditorState);
        latestEditorState.current = newEditorState;
      } else if (isMounted) {
        const emptyState = EditorState.createEmpty();
        setValue(emptyState);
        latestEditorState.current = emptyState;
      }
    }, [desc]);

    const saveContent = () => {
      editorStateChange(value);
      setTimeout(() => {
        const currentContent = latestEditorState.current.getCurrentContent();
        const rawContent = convertToRaw(currentContent);
        const html = draftToHtml(rawContent);
        const sanitizedHtml = DOMPurify.sanitize(html);
        if (sanitizedHtml !== desc) {
          getMarkdownValue(sanitizedHtml);
        }
      }, 0);
    };

    const editorStateChange = (editorState: EditorState) => {
      setValue(editorState);
      latestEditorState.current = editorState;
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          editorWrapperRef.current &&
          !editorWrapperRef.current.contains(event.target as Node)
        ) {
          saveContent();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const myBlockRenderer = (contentBlock: ContentBlock) => {
      const type = contentBlock.getType();
      if (type === "atomic") {
        return {
          component: Media,
          editable: false,
        };
      }
    };

    return (
      <div
        ref={editorWrapperRef}
        style={{ position: "relative", overflow: "visible" }}
      >
        <Editor
          editorState={value}
          ref={ref as React.RefObject<any>}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorStyle={{
            border: "1px solid #ccc",
            minHeight: "20rem",
          }}
          customBlockRenderFunc={myBlockRenderer}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "remove",
              "image",
              "history",
              "emoji",
            ],
            fontSize: {
              options: [
                8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
              ],
            },
            fontFamily: {
              options: [
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
              ],
            },
            image: {
              uploadCallback: undefined,
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
          }}
          onEditorStateChange={editorStateChange}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
