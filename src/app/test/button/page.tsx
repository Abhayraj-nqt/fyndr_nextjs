import React from "react";

import Button from "@/components/global/buttons";

const ButtonTest = () => {
  return (
    <div className="flex gap-4 p-4">
      <Button variant="primary" stdHeight stdWidth>
        Button
      </Button>
      <Button variant="primary-outlined" stdHeight stdWidth>
        Button
      </Button>
      <Button variant="primary-dark" stdHeight stdWidth>
        Button
      </Button>
      <Button variant="primary-dark-outlined" stdHeight stdWidth>
        Button
      </Button>
    </div>
  );
};

export default ButtonTest;
