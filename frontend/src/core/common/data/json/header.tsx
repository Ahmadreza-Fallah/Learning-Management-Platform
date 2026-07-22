import { all_routes } from "../../../../feature-module/router/all_routes";

export const getHeader = (roleId: number) => {
  if (roleId === 1) {
    return [
      {
        tittle: "دوره ها",
        route: all_routes.courseGrid,
        hasSubRoute: false,
        showSubRoute: false,
        menu: [],
      },
      {
        tittle: "داشبورد",
        hasSubRoute: true,
        showSubRoute: true,
        showAsTab2: true,
        base: "student",
        menu: [
          {
            menuValue: "Student Dashboard",
            route: all_routes.studentDashboard,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Enrolled Course",
            route: all_routes.studentCourses,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "My Certificates",
            route: all_routes.studentCertificates,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Wishlist",
            route: all_routes.studentWishlist,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },

          {
            menuValue: "Reviews",
            route: all_routes.studentReviews,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "My Quiz Attempts",
            route: all_routes.studentQuiz,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },

          {
            menuValue: "Order History",
            route: all_routes.studentOrderHistory,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Referrals",
            route: all_routes.studentReferral,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Messages",
            route: all_routes.studentMessage,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Support Ticket",
            route: all_routes.studentTickets,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Settings",
            route: all_routes.studentSettings,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
        ],
      },
          {
        tittle: "درباره ما",
        route:all_routes.about_us,
        showSubRoute: false,
        showAsTab: false,
        separateRoute: false,
      },
       {
        tittle: "تماس با ما",
        route:all_routes.contactUs,
        showSubRoute: false,
        showAsTab: false,
        separateRoute: false,
      },
    ];
  }
  if (roleId === 2) {
    return [
      {
        tittle: "دوره ها",
        base: "course",
        showAsTab: false,
        separateRoute: false,
        menu: [
          {
            menuValue: "Course",
            hasSubRoute: true,
            showSubRoute: true,
            showAsTab2: false,
            subMenus: [
              {
                menuValue: "Course Grid",
                route: all_routes.courseGrid,
                hasSubRoute: false,
                showSubRoute: false,
                subMenus: [],
              },
              {
                menuValue: "Course List",
                route: all_routes.courseList,
                hasSubRoute: false,
                showSubRoute: false,
                subMenus: [],
              },
            ],
          },
        ],
      },
      {
        tittle: "داشبورد",
        base: "instructor",
        base2: "student",
        showAsTab: false,
        separateRoute: false,
        menu: [
          {
            menuValue: "Dashboard",
            route: all_routes.instructorDashboard,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Course",
            route: all_routes.instructorCourse,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Announcements",
            route: all_routes.instructorAnnouncements,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Assignment",
            route: all_routes.instructorAssignment,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Student",
            hasSubRoute: true,
            showSubRoute: true,
            showAsTab2: false,
            subMenus: [
              {
                menuValue: "Student Grid",
                route: all_routes.studentsGrid,
                hasSubRoute: false,
                showSubRoute: false,
                subMenus: [],
              },
            ],
          },
          {
            menuValue: "Quiz",
            route: all_routes.instructorQuiz,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Quiz Results",
            route: all_routes.instructorQuizResult,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Certificate",
            route: all_routes.instructorCertificate,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Earning",
            route: all_routes.instructorEarning,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },

          {
            menuValue: "Payout",
            route: all_routes.instructorPayout,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Statement",
            route: all_routes.instructorStatements,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },

          {
            menuValue: "Support Ticket",
            route: all_routes.instructorTickets,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
          {
            menuValue: "Settings",
            route: all_routes.instructorsettings,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
        ],
      },
             {
        tittle: "درباره ما",
        route:all_routes.about_us,
        showSubRoute: false,
        showAsTab: false,
        separateRoute: false,
      },
       {
        tittle: "تماس با ما",
        route:all_routes.contactUs,
        showSubRoute: false,
        showAsTab: false,
        separateRoute: false,
      },
    ];
  }
  if (roleId === 3) {
    return [
      {
        tittle: "Courses",
        base: "course",
        showAsTab: false,
        separateRoute: false,
        menu: [
          {
            menuValue: "Course",
            hasSubRoute: true,
            showSubRoute: true,
            showAsTab2: false,
            subMenus: [
              {
                menuValue: "Course Grid",
                route: all_routes.courseGrid,
                hasSubRoute: false,
                showSubRoute: false,
                subMenus: [],
              },
              {
                menuValue: "Course List",
                route: all_routes.courseList,
                hasSubRoute: false,
                showSubRoute: false,
                subMenus: [],
              },
            ],
          },
        ],
      },
      {
        tittle: "Dashboard",
        base: "instructor",
        base2: "student",
        showAsTab: false,
        separateRoute: false,
        menu: [
          {
            menuValue: "user management",
            route: all_routes.adminDashboard,
            hasSubRoute: false,
            showSubRoute: false,
            subMenus: [],
          },
        ],
      },
    ];
  }
};
