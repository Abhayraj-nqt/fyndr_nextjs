import AuthContainerWrapper from "../_components/auth-container-wrapper";
import AuthFormWrapper from "../_components/auth-form-wrapper";

const SignUp = () => {
  return (
    <AuthContainerWrapper
      title="Join Fyndr Today!"
      description="Unlock exclusive offers, events, and services tailored just for you. Sign up now to start enjoying amazing experiences!"
    >
      <AuthFormWrapper formType="SIGN_UP" />
    </AuthContainerWrapper>
  );
};

export default SignUp;
