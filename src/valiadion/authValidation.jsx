export function validateForm(type, formData) {
    
    const errors = {};

    if (["signup", "signin", "forgotpass"].includes(type)) {
        if (!formData.email || !formData.email.includes("@")) {
            errors.email = "Please enter a valid email.";
        }
    }

    if (["signup", "signin", "newpass"].includes(type)) {
        if (!formData.password || formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
    }

    if (["signup", "newpass"].includes(type)) {
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
    }

    return errors;
}
