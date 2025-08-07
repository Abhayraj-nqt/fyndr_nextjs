import React from "react";

import ContainerWrapper from "@/components/global/container-wrapper";

import CreateLocationForm from "../../../../../../components/forms/business/location-form/location-form";

const CreateLocation = () => {
  return (
    <ContainerWrapper title="Create Location">
      <CreateLocationForm />
    </ContainerWrapper>
  );
};

export default CreateLocation;
