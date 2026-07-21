import { all_routes } from "../../../../feature-module/router/all_routes";

export const studentSidebarData = [
  {
    title: "Dashboard",
    icon: "isax isax-grid-35",
    route: all_routes.studentDashboard,
  },
  {
    title: "My Profile",
    icon: "fa-solid fa-user",
    route: all_routes.studentProfile,
  },
  {
    title: "Enrolled Courses",
    icon: "isax isax-teacher5",
    route: all_routes.studentCourses,
  },
  {
    title: "Certificates",
    icon: "isax isax-note-215",
    route: all_routes.studentCertificates,
  },
  {
    title: "Order History",
    icon: "isax isax-shopping-cart5",
    route: all_routes.studentOrderHistory,
  },
];
