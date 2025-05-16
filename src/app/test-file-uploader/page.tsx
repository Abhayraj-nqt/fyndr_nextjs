import React from "react";

import FileUploader from "@/components/global/file-uploader/file-uploader";
import FileUploader2 from "@/components/global/file-uploader/file-uploader2";

const TestFileUploader = () => {
  return (
    <div className="w-full">
      <h1>TestFileUploader</h1>
      <div className="relative">
        <FileUploader maxFileSizeMB={5} max={2} multiple>
          <div className="flex-center size-60 border border-dashed p-4">
            <p>File uploader</p>
          </div>
        </FileUploader>
      </div>
    </div>
  );
};

export default TestFileUploader;
