import AuthLayout from "../../layout/AuthLayout";
import AuthForm from "../../components/AuthForm";

function NewPassword() {
    return (
        <AuthLayout>
            <AuthForm type="newpass"/>
        </AuthLayout>
    )
}

export default NewPassword;