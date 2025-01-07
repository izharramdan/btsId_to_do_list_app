import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const AllCheckList = ({ checklists, setChecklists, onDelete }) => {
  const [newItemNames, setNewItemNames] = useState({});

  const handleAddItem = async (checklistId) => {
    const itemName = newItemNames[checklistId];
    if (!itemName) return;

    try {
      const response = await axios.post(
        `http://94.74.86.174:8080/api/checklist/${checklistId}/item`,
        { itemName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Item added successfully!");
      setNewItemNames((prev) => ({ ...prev, [checklistId]: "" })); // Clear the input field

      // Update the checklist items in the state
      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist.id === checklistId
            ? { ...checklist, items: [...(checklist.items || []), response.data.data] }
            : checklist
        )
      );
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const handleDeleteItem = async (checklistId, itemId) => {
    try {
      await axios.delete(`http://94.74.86.174:8080/api/checklist/${checklistId}/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Item deleted successfully!");

      // Update the checklist items in the state
      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist.id === checklistId
            ? { ...checklist, items: checklist.items.filter((item) => item.id !== itemId) }
            : checklist
        )
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item. Please try again.");
    }
  };

  const getRandomColor = () => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-purple-200"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleInputChange = (checklistId, value) => {
    setNewItemNames((prev) => ({ ...prev, [checklistId]: value }));
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {checklists.map((checklist) => (
        <div key={checklist.id} className={`m-4 p-4 w-64 rounded shadow-md ${getRandomColor()}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{checklist.name}</h3>
          </div>
          <p>{checklist.description}</p>
          {checklist.items && (
            <ul className="mt-2">
              {checklist.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b py-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    {item.name}
                  </div>
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteItem(checklist.id, item.id)}
                  />
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            value={newItemNames[checklist.id] || ""}
            onChange={(e) => handleInputChange(checklist.id, e.target.value)}
            placeholder="New item name"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => handleAddItem(checklist.id)}
            className="mt-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Add Item
          </button>
          <button
            onClick={() => onDelete(checklist.id)}
            className="mt-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllCheckList;