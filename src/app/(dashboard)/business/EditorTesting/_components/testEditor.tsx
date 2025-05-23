"use client";
import CustomEditor from "@/components/global/editor/customEditor";
import dynamic from "next/dynamic";
import React from "react";

export default function TestEditor() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Lexical Editor Example</h1>
      <CustomEditor />
    </div>
  );
}
