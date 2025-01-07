import React from "react";

const AllCheckList = ({ checklists, onDelete }) => {
  const getRandomColor = () => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-yellow-200", "bg-purple-200"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {checklists.map((checklist) => (
        <div key={checklist.id} className={`m-4 p-4 w-64 rounded shadow-md ${getRandomColor()}`}>
          <div className="flex items-center">
            <input type="radio" className="mr-2" />
            <h3 className="text-lg font-bold">{checklist.name}</h3>
          </div>
          <p>{checklist.description}</p>
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