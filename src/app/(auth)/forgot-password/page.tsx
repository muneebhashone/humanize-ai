import ForgetPassword from "@/components/Auth/ForgetPassword";
import { Suspense } from "react";

const ForgotPasswordPage   = () => {
  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetPassword />
      </Suspense>

  );
};

export default ForgotPasswordPage;
