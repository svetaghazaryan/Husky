import MainLayout from "../../layout/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function UserProfile() {
  const { user, setUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState();

  useEffect(() => {
    if (user) {
      const { id, ...userData } = user;
      setUpdatedUser(userData);
    }
  }, [user]);

  if (!user || !updatedUser) return null;
  const { id, ...userData } = user;

  const handleChange = (e) => {
    setUpdatedUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleSave = async () => {
    try {
      await api.patch(`/users/${id}`, updatedUser);
      setUser({ id, ...updatedUser });
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <MainLayout>
      <div className="h-full bg-white m-8 p-8 rounded-2xl shadow-md text-center flex items-center justify-center
                      max-md:m-4 max-md:p-4 /* responsive below 700px */">
        <div className="py-0 px-8 rounded-2xl text-center w-full max-w-lg
                        max-md:px-4 max-md:mx-2 /* responsive below 700px */">
          <div className="relative w-48 h-48 mx-auto mb-6
                          max-md:w-36 max-md:h-36 /* responsive below 700px */">
            <div className="w-48 h-48 rounded-full bg-gray-100
                            max-md:w-36 max-md:h-36 /* responsive below 700px */">
              <img src="/logo192.png" alt="User Profile" />
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center
                            max-md:w-9 max-md:h-9 max-md:text-lg /* responsive below 700px */">
              <span className="text-purple-500 text-xl max-md:text-lg /* responsive below 700px */">📷</span>
            </div>
          </div>
          <div className="space-y-5 mx-20 text-left text-lg text-gray-700
                          max-md:mx-4 max-md:text-base /* responsive below 700px */">
            {Object.entries(updatedUser).map(([key, value]) => {
              if (key === "password") return null;
              return (
                <div key={key}>
                  <div className="text-lg text-gray-400 mb-1 capitalize
                                  max-md:text-base /* responsive below 700px */">
                    {key.replace("Name", " Name")}
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-lg focus:ring-1 focus:ring-purple-500 outline-none
                                 max-md:text-base max-md:px-1 max-md:py-1 /* responsive below 700px */"
                    />
                  ) : (
                    <div className="text-black font-medium my-3
                                    max-md:text-base /* responsive below 700px */">
                      {value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-6 items-center
                          max-md:gap-4 /* responsive below 700px */">
            {editMode ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center
                              max-md:flex-col max-md:gap-3 /* responsive below 700px */">
                <button
                  onClick={() => {
                    setEditMode(false);
                    setUpdatedUser(userData);
                  }}
                  className="w-1/3 border border-gray-300 bg-white hover:bg-gray-100 text-black text-lg py-2 float-right rounded-xl transition
                             max-md:w-full /* responsive below 700px */"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-1/3 bg-purple-500 hover:bg-purple-600 text-white text-lg py-2 float-left rounded-xl transition
                             max-md:w-full /* responsive below 700px */"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-2/3 bg-purple-500 hover:bg-purple-600 text-white text-lg py-2 rounded-xl transition
                           max-md:w-full /* responsive below 700px */"
              >
                Edit
              </button>
            )}

            <button
              className="text-lg text-black font-bold
                         max-md:text-base /* responsive below 700px */"
              onClick={handleLogout}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
