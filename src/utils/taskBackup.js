const VALID_PRIORITIES = [
  "High",
  "Medium",
  "Low",
];

const VALID_STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
];

const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const isValidDate = (value) => {
  if (value === "") {
    return true;
  }

  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value
    )
  ) {
    return false;
  }

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  return (
    date.getFullYear() === year &&
    date.getMonth() ===
      month - 1 &&
    date.getDate() === day
  );
};

const normalizeTask = (
  task,
  index
) => {
  if (!isPlainObject(task)) {
    throw new Error(
      "Invalid task."
    );
  }

  const title =
    typeof task.title === "string"
      ? task.title.trim()
      : "";

  if (!title) {
    throw new Error(
      "Task title is required."
    );
  }

  const description =
    typeof task.description ===
    "string"
      ? task.description
      : "";

  const category =
    typeof task.category === "string"
      ? task.category.trim()
      : "";

  if (!category) {
    throw new Error(
      "Task category is required."
    );
  }

  if (
    !VALID_PRIORITIES.includes(
      task.priority
    )
  ) {
    throw new Error(
      "Invalid task priority."
    );
  }

  if (
    !VALID_STATUSES.includes(
      task.status
    )
  ) {
    throw new Error(
      "Invalid task status."
    );
  }

  const dueDate =
    task.dueDate ?? "";

  if (!isValidDate(dueDate)) {
    throw new Error(
      "Invalid task due date."
    );
  }

  const numericProgress =
    Number(task.progress);

  if (
    !Number.isFinite(
      numericProgress
    )
  ) {
    throw new Error(
      "Invalid task progress."
    );
  }

  let progress = Math.min(
    Math.max(
      numericProgress,
      0
    ),
    100
  );

  if (
    task.status === "Completed"
  ) {
    progress = 100;
  }

  if (
    task.status === "Pending"
  ) {
    progress = 0;
  }

  const hasValidId =
    (typeof task.id === "number" &&
      Number.isFinite(task.id)) ||
    (typeof task.id === "string" &&
      task.id.trim() !== "");

  const id = hasValidId
    ? task.id
    : Date.now() + index;

  return {
    ...task,
    id,
    title,
    description,
    category,
    priority: task.priority,
    dueDate,
    progress,
    status: task.status,
  };
};

export const parseTaskBackup = (
  backupText
) => {
  let parsedData;

  try {
    parsedData =
      JSON.parse(backupText);
  } catch {
    throw new Error(
      "Backup is not valid JSON."
    );
  }

  if (!Array.isArray(parsedData)) {
    throw new Error(
      "Invalid backup format."
    );
  }

  const normalizedTasks =
    parsedData.map(
      (task, index) =>
        normalizeTask(
          task,
          index
        )
    );

  const taskIds = new Set();

  normalizedTasks.forEach(
    (task) => {
      const idKey =
        String(task.id);

      if (taskIds.has(idKey)) {
        throw new Error(
          "Duplicate task ID."
        );
      }

      taskIds.add(idKey);
    }
  );

  return normalizedTasks;
};