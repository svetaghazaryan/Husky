import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import AuthPage from "../pages/Auth/AuthPage";
import NewPassword from '../pages/Auth/NewPassword'
import UserProfile from '../pages/Profile/UserProfile'
import Dashboard from '../pages/Profile/Dashboard'
import ChatPage from '../pages/Profile/ChatPage'

const ProtectedRoute = () => {
    const userID = localStorage.getItem("userId");
    return userID ? <Outlet /> : <Navigate to="/signin" replace />;
};

function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signIn" element={<AuthPage />} ></Route>
                <Route path="/signUp" element={<AuthPage />} ></Route>
                <Route path="/forgotPass" element={<AuthPage />} ></Route>
                <Route path="/newPass/:email" element={<NewPassword />} ></Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Route>
                <Route path="*" element={<AuthPage />} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouters;