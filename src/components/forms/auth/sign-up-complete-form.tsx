"use client";

import { useRegistrationStore } from "@/zustand/stores/registration.store";
import React from "react";
import BusinessForm from "./business-form";
import IndividualForm from "./individual-form";

const SignUpCompleteForm = () => {
  const { isBusiness } = useRegistrationStore();

  const handleSubmit = async (data) => {
    console.log(data);
  };

  switch (isBusiness) {
    case true:
      return <BusinessForm onSubmit={handleSubmit} />;
    default:
      return <IndividualForm onSubmit={handleSubmit} />;
  }
};

export default SignUpCompleteForm;
