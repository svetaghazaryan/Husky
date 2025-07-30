import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { validateForm } from '../valiadion/authValidation'
import api from '../services/api'
import { constFormTypes } from '../const/constants'


function AuthForm({ type }) {

    const navigate = useNavigate()
    const params = useParams()
    const { login } = useAuth()
    const [formData, setFormData] = useState({});
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [error, setError] = useState({});
    const config = constFormTypes[type]

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value.trimStart() });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError({});
        setEmailError(false);
        setPasswordError(false);

        const errors = validateForm(type, formData);

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        if (type === 'signin') {

            try {
                const res = await api.get("/users", { params: { email: formData.email } })
                if (res.data.length > 0) {
                    if (res.data[0].password === formData.password) {
                        navigate('/profile')
                        login(res.data[0])
                    } else {
                        setPasswordError(true)
                    }
                } else {
                    setEmailError(true)
                }
            } catch (err) {
                console.log(err)
            }

        } else if (type === 'signup') {
            try {
                const res = await api.get("/users", { params: { email: formData.email } })

                if (res.data.length > 0) {
                    setEmailError(true)

                } else {
                    try {
                        const { confirmPassword, ...userData } = formData;
                        await api.post("/users", { ...userData })
                        navigate("/signin")
                    } catch (err) {
                        console.log(err)
                    }
                }

            } catch (err) {
                console.log(err)
            }
        } else if (type === 'forgotpass') {

            try {
                const res = await api.get("/users", { params: { email: formData.email } })

                if (res.data.length > 0) {
                    navigate(`/newPass/${formData.email}`)
                } else {
                    setEmailError(true)
                }
            } catch (err) {
                console.log(err)
            }

        } else if (type === 'newpass') {

            try {
                const user = await api.get("/users", { params: { email: params.email } })
                await api.patch(`/users/${user.data[0].id}`, { password: formData['password'] })
                navigate("/signin")
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <form onSubmit={handleSubmit} noValidate
            className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md space-y-6">
            <h2 className='text-2xl font-semibold text-center text-black'>{config.header}</h2>

            {config.fields.map((field, index) => (
                <div key={field} className="flex flex-col">
                    <label key={field} htmlFor={field} className="text-sm font-medium text-gray-400 mb-1 focus-within:text-purple-500">
                        {config.fieldsName[index]} <br />
                        <input
                            name={field}
                            type={field.toLowerCase().includes("password")
                                ? "password"
                                : field.toLowerCase().includes("email")
                                    ? "email"
                                    : "text"}
                            onChange={handleChange}
                            className="w-full border border-gray-300 focus:ring-1 focus:ring-purple-500 rounded-md px-3 py-2 text-sm outline-none"
                        />
                        {emailError && field === "email" && (
                            <sub className="text-red-500 text-xs mt-1 block">Email is not found or already used!</sub>
                        )}

                        {passwordError && field === "password" && (
                            <sub className="text-red-500 text-xs mt-1 block">Incorrect password!</sub>
                        )}

                        {error[field] && (
                            <sub className="text-red-500 text-xs mt-1 block">{error[field]}</sub>
                        )}
                    </label>
                </div>
            ))}

            {config.showForgotLink &&
                <div className="text-right text-sm">
                    <Link to="/forgotPass" className="text-purple-500 hover:underline">Forgot Password?</Link>
                </div>
            }

            <button type="submit" className="w-full bg-purple-500 text-white rounded-lg py-2 font-medium hover:bg-purple-600 transition">{config.button}</button>
            <div className="text-center">
                <Link to={config.bottomLink.to} className="text-black font-semibold text-sm hover:underline">{config.bottomLink.text}</Link>
            </div>
        </form>
    )
}

export default AuthForm;