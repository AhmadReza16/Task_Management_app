import { useState } from "react";

import toast from "react-hot-toast";

import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import RangeSlider from "../common/RangeSlider";

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  category: "",
  priority: "Medium",
  dueDate: "",
  progress: 0,
  status: "Pending",
};

const CATEGORY_OPTIONS = [
  {
    value: "",
    label: "Select Category",
  },
  {
    value: "Frontend",
    label: "Frontend",
  },
  {
    value: "Backend",
    label: "Backend",
  },
  {
    value: "UI/UX",
    label: "UI / UX",
  },
  {
    value: "Testing",
    label: "Testing",
  },
  {
    value: "Deployment",
    label: "Deployment",
  },
];

const PRIORITY_OPTIONS = [
  {
    value: "High",
    label: "High",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Low",
    label: "Low",
  },
];

const STATUS_OPTIONS = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Completed",
    label: "Completed",
  },
];

/* =====================================
   Get Today's Local Date
===================================== */

const getLocalDateString = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =====================================
   Create Initial Form Data
===================================== */

const getInitialFormData = (editingTask) => {
  if (!editingTask) {
    return {
      ...INITIAL_FORM_STATE,
    };
  }

  return {
    ...INITIAL_FORM_STATE,
    ...editingTask,

    progress: Number(editingTask.progress ?? 0),
  };
};

const AddTaskForm = ({ onAddTask, onUpdateTask, editingTask }) => {
  /*
   * Dashboard gives this component a key.
   *
   * New task:
   * key="new-task"
   *
   * Edit task:
   * key={editingTask.id}
   *
   * Therefore this initializer runs again
   * whenever another task is selected.
   */

  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingTask),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =====================================
     Handle Input Changes
  ===================================== */

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    const normalizedValue = type === "range" ? Number(value) : value;

    setFormData((previous) => {
      const updatedForm = {
        ...previous,

        [name]: normalizedValue,
      };

      /*
       * Progress reaches 100:
       * automatically mark completed.
       */

      if (name === "progress" && normalizedValue === 100) {
        updatedForm.status = "Completed";
      }

      /*
       * Progress falls below 100 while
       * task was completed:
       * change status appropriately.
       */

      if (
        name === "progress" &&
        normalizedValue < 100 &&
        previous.status === "Completed"
      ) {
        updatedForm.status = normalizedValue > 0 ? "In Progress" : "Pending";
      }

      /*
       * Selecting Completed manually:
       * automatically set progress 100.
       */

      if (name === "status" && normalizedValue === "Completed") {
        updatedForm.progress = 100;
      }

      /*
       * Selecting Pending manually:
       * reset progress when currently
       * completed.
       */

      if (
        name === "status" &&
        normalizedValue === "Pending" &&
        previous.status === "Completed"
      ) {
        updatedForm.progress = 0;
      }

      /*
       * Selecting In Progress manually
       * from Completed should prevent
       * progress remaining at 100.
       */

      if (
        name === "status" &&
        normalizedValue === "In Progress" &&
        previous.status === "Completed" &&
        previous.progress === 100
      ) {
        updatedForm.progress = 50;
      }

      return updatedForm;
    });
  };

  /* =====================================
     Minimum Due Date
  ===================================== */

  const today = getLocalDateString();

  /*
   * Existing tasks may already have an
   * old due date.
   *
   * Keep that date selectable while
   * editing instead of forcing today.
   */

  const minDate =
    editingTask && formData.dueDate && formData.dueDate < today
      ? formData.dueDate
      : today;

  /* =====================================
     Submit Form
  ===================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const title = formData.title.trim();

    const description = formData.description.trim();

    /* ---------- Validation ---------- */

    if (!title) {
      toast.error("Task title is required.");

      return;
    }

    if (!formData.category) {
      toast.error("Please select a category.");

      return;
    }

    if (!formData.dueDate) {
      toast.error("Please select a due date.");

      return;
    }

    const normalizedTask = {
      ...formData,

      title,

      description,

      progress: Number(formData.progress),
    };

    try {
      setIsSubmitting(true);

      /* ---------- Edit ---------- */

      if (editingTask) {
        await Promise.resolve(
          onUpdateTask({
            ...normalizedTask,

            id: editingTask.id,
          }),
        );

        return;
      }

      /* ---------- Add ---------- */

      await Promise.resolve(
        onAddTask({
          ...normalizedTask,

          id: Date.now(),
        }),
      );

      /*
       * Only reset here for Add mode.
       * Edit mode gets unmounted after
       * Dashboard clears editingTask.
       */

      setFormData({
        ...INITIAL_FORM_STATE,
      });
    } catch (error) {
      console.error(
        editingTask ? "Failed to update task:" : "Failed to add task:",
        error,
      );

      toast.error(
        editingTask ? "Failed to update task." : "Failed to add task.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-200
        dark:border-slate-800

        bg-white
        dark:bg-slate-900

        p-6
        md:p-8

        shadow-md

        transition-colors
        duration-300
      "
    >
      {/* =====================================
          Header
      ===================================== */}

      <div className="mb-8">
        <h2
          className="
            text-2xl
            font-bold

            text-gray-800
            dark:text-white
          "
        >
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <p
          className="
            mt-2

            text-gray-500
            dark:text-slate-400
          "
        >
          {editingTask
            ? "Update your task information."
            : "Fill in the details below to create a new task."}
        </p>
      </div>

      {/* =====================================
          Form
      ===================================== */}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Task Title */}

        <Input
          label="Task Title"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          autoComplete="off"
          required
        />

        {/* Description */}

        <Textarea
          label="Description"
          name="description"
          placeholder="Describe the task..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          maxLength={500}
        />

        {/* Task Information */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
          "
        >
          {/* Category */}

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORY_OPTIONS}
            required
          />

          {/* Priority */}

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
          />

          {/* Due Date */}

          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={minDate}
            required
          />

          {/* Status */}

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
          />
        </div>

        {/* Progress */}

        <RangeSlider
          label="Progress"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
        />

        {/* Submit */}

        <div className="pt-3">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="
              w-full

              md:w-auto
              md:px-10
            "
          >
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
