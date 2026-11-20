import {
  LayoutDashboard,
  KanbanSquare,
  CalendarDays,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Board",
    path: "/board",
    icon: KanbanSquare,
  },
  {
    id: 3,
    name: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    id: 4,
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    id: 5,
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];