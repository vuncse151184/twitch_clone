import { SignIn } from '@clerk/nextjs';


const SignInPage = () => (
  <div>
    <SignIn signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;