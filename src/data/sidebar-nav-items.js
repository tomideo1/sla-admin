import store from "@/store/index";

export default function() {
  let superAdminRoutes = [
    {
      title: "Admin",
      htmlBefore: "group",
      items: [
        {
          title: "All Admins",
          to: {
            name: "all-admins"
          }
        },
        {
          title: "Add New",
          to: {
            name: "create-admin"
          }
        },
        {
          title: " Admin Profile",
          to: {
            name: "edit-profile"
          }
        }
      ]
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
          title: "users",
          htmlBefore: "group",
          to: {
            name: "users"
          }
        },
        {
          title: "Activity",
          htmlBefore: "activity",
          to: {
            name: "all-coaches"
          }
        },

        {
          title: "Courses",
          htmlBefore: "courses",
          to: {
            name: "courses"
          }
        },
        {
          title: "Announcements",
          htmlBefore: "announce",
          to: {
            name: "announcements"
          }
        },
        {
          title: "Groups",
          htmlBefore: "group",
          to: {
            name: "groups"
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
            name: "scorecards"
          }
        },
        {
          title: "survey",
          htmlBefore: "survey",
          to: {
            name: "surveys"
          }
        },
        {
          title: "polls",
          htmlBefore: "poll",
          to: {
            name: "polls"
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
            name: "resources"
          }
        },
        {
          title: "Help",
          htmlBefore: "faq",
          to: {
            name: "support"
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

  return appRoutes;
}
