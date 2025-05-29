import ContainerWrapper from "@/components/global/ContainerWrapper";
import { LexicalEditor } from "lexical";
import React from "react";
import TestEditor from "./_components/testEditor";

const Editorpage = () => {
  return (
    <ContainerWrapper title="Editor Testing">
      <TestEditor />
    </ContainerWrapper>
  );
};

export default Editorpage;
