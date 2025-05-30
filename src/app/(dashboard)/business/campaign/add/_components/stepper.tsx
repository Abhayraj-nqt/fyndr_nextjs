import StepperComponent from "@/components/global/stepper-component";

const steps = [
  {
    step: 1,
    title: "Type",
  },
  {
    step: 2,
    title: "Objective & Category",
  },
  {
    step: 3,
    title: "Description",
  },
  {
    step: 4,
    title: "Images & Videos",
  },
  {
    step: 5,
    title: "Offers",
  },
  {
    step: 6,
    title: "Terms & Conditions",
  },
  {
    step: 7,
    title: "Locations",
  },
];

const Stepper = () => {
  return <StepperComponent steps={steps} />;
};

export default Stepper;
