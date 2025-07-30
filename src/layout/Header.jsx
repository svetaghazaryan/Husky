import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { menuItems } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-screen bg-white shadow">
            <div className="h-16 flex items-center justify-between px-4 md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-2xl p-2">
                    ☰
                </button>
                <NavLink
                    to="/dashboard"
                    className="w-10 h-10 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition">
                    &#9998;
                </NavLink>
            </div>

            <div className="hidden md:flex items-center justify-around h-24 px-8 text-xl">
                {menuItems.map((item) =>
                    item.children.length > 0 ? (
                        <div key={item.id} className="relative group">
                            <NavLink
                                to={item.url}
                                className={({ isActive }) =>
                                    `transition hover:text-purple-500 ${isActive ? "text-purple-700 font-semibold" : ""
                                    }`
                                }
                            >{item.name} <span>🡣</span>
                            </NavLink>
                            <div className="absolute left-0 top-8 hidden group-hover:flex flex-col bg-white shadow-md rounded-md text-lg min-w-[10rem]">
                                {item.children.map((child) => (
                                    <NavLink
                                        key={child.id}
                                        to={child.url}
                                        className="px-4 py-2 hover:bg-purple-100 transition">
                                        {child.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <NavLink
                            key={item.id}
                            to={item.url}
                            className={({ isActive }) =>
                                `transition hover:text-purple-500 ${isActive ? "text-purple-700 font-semibold" : ""
                                }`
                            }>{item.name}
                        </NavLink>
                    )
                )}
                <NavLink
                    to="/dashboard"
                    className="w-12 h-12 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition">
                    &#9998;
                </NavLink>
            </div>

            {isMenuOpen && (
                <div className="md:hidden flex flex-col p-4 space-y-3 text-xl border-t">
                    {menuItems.map((item) =>
                        item.children.length > 0 ? (
                            <div key={item.id} className="flex flex-col">
                                <NavLink
                                    to={item.url}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `py-2 transition hover:text-purple-500 ${isActive ? "text-purple-700 font-semibold" : ""
                                        }`
                                    }
                                >{item.name}
                                </NavLink>
                                <div className="flex flex-col pl-4 text-lg">
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.id}
                                            to={child.url}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="py-1 hover:text-purple-500 transition"
                                        >
                                            {child.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <NavLink
                                key={item.id}
                                to={item.url}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `py-2 transition hover:text-purple-500 ${isActive ? "text-purple-700 font-semibold" : ""
                                    }`
                                }>{item.name}
                            </NavLink>
                        )
                    )}
                </div>
            )}
        </header>
    )
}

export default Header;