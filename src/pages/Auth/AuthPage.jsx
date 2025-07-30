import { useLocation } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import AuthForm from "../../components/AuthForm";

const authTypes = {
  '/signin': 'signin',
  '/signup': 'signup',
  '/forgotPass': 'forgotpass'
};

function AuthPage() {
  const location = useLocation();
  const path = location.pathname;
  const type = authTypes[path] || 'signin';

  return (
    <AuthLayout>
      <AuthForm type={type} />
    </AuthLayout>
  );
}

export default AuthPage;