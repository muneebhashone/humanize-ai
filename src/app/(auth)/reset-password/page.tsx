import ResetPassword from "@/components/Auth/ResetPassword";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
