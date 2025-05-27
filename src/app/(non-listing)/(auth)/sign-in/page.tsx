import AuthContainerWrapper from "../_components/auth-container-wrapper";
import AuthFormWrapper from "../_components/auth-form-wrapper";

const SignIn = () => {
  return (
    <AuthContainerWrapper
      title="Welcome Back!"
      description="Log in to access your account and continue exploring amazing offers, events, and services."
    >
      <AuthFormWrapper formType="SIGN_IN" />
    </AuthContainerWrapper>
  );
};

export default SignIn;
