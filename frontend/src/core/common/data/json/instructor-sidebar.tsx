import { all_routes } from "../../../../feature-module/router/all_routes";

export const instructorSidebarData = [
  {
    title: "Dashboard",
    icon: "isax isax-grid-35",
    route: all_routes.instructorDashboard,
  },
  {
    title: "My Profile",
    icon: "fa-solid fa-user",
    route: all_routes.instructorProfile,
  },
  {
    title: "Courses",
    icon: "isax isax-teacher5",
    route: all_routes.instructorCourse,
  },
  {
    title: "Students",
    icon: "isax isax-profile-2user5",
    route: all_routes.studentsList,
  },
  {
    title: "Certificates",
    icon: "isax isax-note-215",
    route: all_routes.instructorCertificate,
  },
];
