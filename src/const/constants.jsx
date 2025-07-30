
export const constFormTypes = {
    signin: {
        header: "Sign In",
        fields: ["email", "password"],
        fieldsName: ["Email", "Password"],
        button: "Sign In",
        bottomLink: { text: "Sign Up", to: "/signup" },
        showForgotLink: true,
    },
    signup: {
        header: "Sign Up",
        fields: ["firstName", "lastName", "email", "password", "confirmPassword"],
        fieldsName: ["First Name", "Last Name", "Email", "Password", "Confirm Password"],
        button: "Sign Up",
        bottomLink: { text: "Sign In", to: "/signin" },
        showForgotLink: true,
    },
    forgotpass: {
        header: "Forgot Password",
        fields: ["email"],
        fieldsName: ["Email"],
        button: "Send",
        bottomLink: { text: "Sign In", to: "/signin" },
        showForgotLink: false,
    },
    newpass: {
        header: "Create New Password",
        fields: ["password", "confirmPassword"],
        fieldsName: ["New Password", "Confirm Password"],
        button: "Save",
        bottomLink: { text: "Sign In", to: "/signin" },
        showForgotLink: false,
    },
};


export const headerItems = [
    {
      id: 1,
      name: "Home",
      url: "/profile",
      children: [],
    },
    {
      id: 2,
      name: "About Us",
      url: "/about",
      children: [],
    },
    {
      id: 3,
      name: "Blog",
      url: "/blog",
      children: [
        { id: 4, name: "Client Success", url: "/blog/client" },
        { id: 5, name: "5 greatest books", url: "/blog/books" },
      ],
    },
    {
      id: 6,
      name: "Partners",
      url: "/partners",
      children: [
        { id: 7, name: "Affiliate", url: "/partners/affiliate" },
        { id: 8, name: "Sponsors", url: "/partners/sponsors" },
      ],
    },
    {
      id: 9,
      name: "Contact Us",
      url: "/chat",
      children: [],
    },
  ]