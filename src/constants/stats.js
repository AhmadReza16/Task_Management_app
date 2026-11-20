import {
  ListTodo,
  CircleCheck,
  Clock3,
  LoaderCircle,
} from "lucide-react";

export const stats = [
  {
    id: 1,
    title: "Total Tasks",
    value: 0,
    icon: ListTodo,
    trend: "Live",
    subtitle: "All tasks in your workspace",
  },
  {
    id: 2,
    title: "Completed",
    value: 0,
    icon: CircleCheck,
    trend: "Done",
    subtitle: "Tasks completed successfully",
  },
  {
    id: 3,
    title: "Pending",
    value: 0,
    icon: Clock3,
    trend: "Waiting",
    subtitle: "Tasks waiting to be started",
  },
  {
    id: 4,
    title: "In Progress",
    value: 0,
    icon: LoaderCircle,
    trend: "Active",
    subtitle: "Tasks currently being worked on",
  },
];