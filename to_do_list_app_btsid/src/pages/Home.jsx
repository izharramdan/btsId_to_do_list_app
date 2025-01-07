import React, { useState, useEffect } from "react";
import AllCheckList from "../components/AllCheckLists/AllCheckList";
import Navbar from "../components/Navbar/Navbar";
import AddToDoForm from "../components/AddToDoForm/AddToDoForm";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await axios.get("http://94.74.86.174:8080/api/checklist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setChecklists(response.data.data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      }
    };

    fetchChecklists();
  }, []);

  const handleAddToDo = (newToDo) => {
    setChecklists([...checklists, newToDo]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://94.74.86.174:8080/api/checklist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setChecklists(checklists.filter((checklist) => checklist.id !== id));
      toast.success("To-Do List deleted successfully!");
    } catch (error) {
      console.error("Error deleting to-do list:", error);
      toast.error("Failed to delete to-do list. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add To-Do List
        </button>
      </div>
      {showForm && (
        <AddToDoForm onClose={() => setShowForm(false)} onAdd={handleAddToDo} />
      )}
      <AllCheckList checklists={checklists} onDelete={handleDelete} />
    </div>
  );
};

export default Home;