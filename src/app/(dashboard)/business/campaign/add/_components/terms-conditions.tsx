import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import CustomEditor from "@/components/global/editor/customEditor";

const TermsAndConditions = () => {
  return (
    <>
      <DefaultCard className="m-4 min-h-[300px] w-full max-w-[900px] flex-col border-solid bg-white p-[23px] outline-black">
        <CustomEditor />
      </DefaultCard>
    </>
  );
};

export default TermsAndConditions;
