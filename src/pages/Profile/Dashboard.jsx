import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Reorder } from "motion/react"

function Dashboard() {

  const { menuItems, setMenuItems } = useAuth();
  const [newItem, setNewItem] = useState({ name: "", url: "" });
  const [parentId, setParentId] = useState(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!newItem.name.trim() || !newItem.url.trim()) return;

    let url = newItem.url.trim();
    if (!parentId && !url.startsWith('/')) {
      url = '/' + url;
    }

    const newId = Date.now();
    const itemToAdd = {
      id: newId,
      name: newItem.name,
      url: url,
    };

    if (!parentId) {
      setMenuItems([...menuItems, { ...itemToAdd, children: [] }]);
    } else {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === Number(parentId)
            ? { ...item, children: [...item.children, itemToAdd] }
            : item
        )
      );
    }

    setNewItem({ name: "", url: "" });
    setParentId(null);
  };

  const handleDelete = (id, parentId = null) => {
    if (parentId) {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === parentId
            ? { ...item, children: item.children.filter((child) => child.id !== id) }
            : item
        )
      );
    } else {
      setMenuItems((items) => items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col xs:flex-row h-screen bg-gray-100 text-gray-800">
      <div className="xs:w-1/3  w-full bg-white p-6 rounded-l-2xl shadow-md">
        <button className="text-purple-500 mb-4 text-xl" onClick={() => navigate(-1)}> &#10229; Back</button>
        <div className="flex flex-col gap-4">

          <input
            placeholder="*Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-purple-500"
          />
          <select
            className="bg-white border border-gray-300 rounded px-3 py-2 outline-none"
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value || null)}
          >
            <option value="">No Parent Menu</option>
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            placeholder="URL"
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl transition">
            Add
          </button>
        </div>
      </div>

      <div className="  xs:w-2/3 w-full p-6 bg-white rounded-r-2xl shadow-md">
        <Reorder.Group values={menuItems} onReorder={setMenuItems}>
          {menuItems.map((item) => (
            <Reorder.Item key={item.id} value={item}>

              <div key={item.id} className="mb-4">
                <div className="flex justify-between items-center px-4 py-2 border rounded-md shadow-sm bg-gray-50 hover:cursor-pointer">
                  <div> &#8693; {item.name}</div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-gray-500 hover:underline"> X
                  </button>
                </div>

                {item.children.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Reorder.Group values={item.children} onReorder={(newChildren) => {
                      setMenuItems((prev) => prev.map((prevItem) =>
                        prevItem.id === item.id ? { ...prevItem, children: newChildren } : prevItem
                      )
                      )
                    }}>
                      {item.children.map((child) => (
                        <Reorder.Item key={child.id} value={child}>
                          <div
                            key={child.id}
                            className="flex justify-between items-center px-4 py-2 border rounded-md bg-white shadow-sm hover:cursor-pointer">
                            <div> &#8693; {child.name}</div>
                            <button
                              onClick={() => handleDelete(child.id, item.id)}
                              className="text-sm text-gray-500 hover:underline">
                              X
                            </button>
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                )}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

export default Dashboard;
