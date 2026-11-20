import { useState } from "react";

const TaskCounter = () => {
  const [count, setCount] = useState(12);

  const handleAddTask = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Task Counter</h2>

      <p className="text-4xl font-bold mb-5">{count}</p>

      <button
        onClick={handleAddTask}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskCounter;
