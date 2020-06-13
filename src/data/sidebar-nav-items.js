import store from "@/store/index";

export default function() {
  let superAdminRoutes = [
    {
      title: "Admins",
      htmlBefore: "group",
      to: {
        name: "all-admins"
      }
      // title: "Admin",
      // htmlBefore: "group",
      // items: [
      //   {
      //     title: "All Admins",
      //     to: {
      //       name: "all-admins"
      //     }
      //   },
      //   {
      //     title: "Add New",
      //     to: {
      //       name: "create-admin"
      //     }
      //   },
      //   {
      //     title: " Admin Profile",
      //     to: {
      //       name: "edit-profile"
      //     }
      //   }
      // ]
    }
  ];

  let appRoutes = [
    {
      title: "Menu",
      items: [
        {
          title: "Home",
          htmlBefore: "home",
          to: {
            name: "dashboard"
          }
        },
        {
          title: "Users",
          htmlBefore: "group",
          to: {
            name: "all-users"
          }
        },
        // {
        //   title: "Activity",
        //   htmlBefore: "activity",
        //   to: {
        //     name: "all-coaches"
        //   }
        // },

        {
          title: "Courses",
          htmlBefore: "courses",
          to: {
            name: "all-courses"
          }
        },
        {
          title: "Announcements",
          htmlBefore: "announce",
          to: {
            name: "all-announcements"
          }
        },
        {
          title: "Groups",
          htmlBefore: "group",
          to: {
            name: "all-groups"
          }
        },
        {
          title: "Leaderboard",
          htmlBefore: "leaderboard",
          to: {
            name: "leaderboard"
          }
        },
        {
          title: "Scorecard",
          htmlBefore: "scorecard",
          to: {
            name: "all-scorecards"
          }
        },
        {
          title: "Surveys",
          htmlBefore: "survey",
          to: {
            name: "all-surveys"
          }
        },
        {
          title: "Polls",
          htmlBefore: "poll",
          to: {
            name: "all-polls"
          }
        },
        {
          title: "Asset",
          htmlBefore: "asset",
          to: {
            name: "assets"
          }
        },
        {
          title: "Resources",
          htmlBefore: "resource",
          to: {
            name: "all-resources"
          }
        },
        {
          title: "Help",
          htmlBefore: "faq",
          to: {
            name: "all-tickets"
          }
        },
        {
          title: "Logout",
          htmlBefore: "logout",
          to: {
            name: "logout"
          }
        }
      ]
    }
  ];

  let coachRoutes = [
    {
      title: "Menu",
      items: [
        {
          title: "Home",
          htmlBefore: "home",
          to: {
            name: "coach-dashboard"
          }
        },
        {
          title: "Announcements",
          htmlBefore: "announce",
          to: {
            name: "all-announcements"
          }
        },
        {
          title: "Groups",
          htmlBefore: "group",
          to: {
            name: "all-groups"
          }
        },
        {
          title: "Scorecard",
          htmlBefore: "scorecard",
          to: {
            name: "all-scorecards"
          }
        },
        {
          title: "Surveys",
          htmlBefore: "survey",
          to: {
            name: "all-surveys"
          }
        },
        {
          title: "Resources",
          htmlBefore: "resource",
          to: {
            name: "all-resources"
          }
        },
        {
          title: "Help",
          htmlBefore: "faq",
          to: {
            name: "all-tickets"
          }
        },
        {
          title: "Logout",
          htmlBefore: "logout",
          to: {
            name: "logout"
          }
        }
      ]
    }
  ];

  if (store.state.auth.role === "superadmin") {
    appRoutes[0].items = [...appRoutes[0].items, ...superAdminRoutes];
  }

  if (store.state.auth.role === "coach") {
    appRoutes = coachRoutes;
  }

  return appRoutes;
}
