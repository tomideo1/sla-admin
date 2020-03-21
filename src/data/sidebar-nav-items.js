import store from "@/store/index"

export default function () {
  let superAdminRoutes = [
    {
      "title":"Admin",
      "htmlBefore":"<i class=\"material-icons\">person</i>",
      "items": [
      {
          "title":"All Admins",
          "to":{
            "name":"dashboard"
          }
        },
        {
          "title":"Add New",
          "to":{
            "name":"create-admin"
          }
        },
      ]
    },
  ]  

  let appRoutes = [
  {
  "title":"Dashboards",
  "items":[
    {
      "title":"Dashboard",
      "htmlBefore":"<i class=\"material-icons\">dashboard</i>",
      "to":{
        "name":"dashboard"
      }
    },
    {
      "title":"Courses",
      "htmlBefore":"<i class=\"material-icons\">library_books</i>",
      "items": [
      {
          "title":"All Courses",
          "to":{
            "name":"all-courses"
          }
        },
        {
          "title":"Add New",
          "to":{
            "name":"create-course"
          }
        },
      ]
    },
    {
      "title":"Groups",
      "htmlBefore":"<i class=\"material-icons\">people</i>",
      "to":{
        "name":"all-groups"
      }
    },
    {
      "title":"Coaches",
      "htmlBefore":"<i class=\"material-icons\">school</i>",
      "to":{
        "name":"all-coaches"
      }
    },
    {
      "title":"Messaging",
      "htmlBefore":"<i class=\"material-icons\">message</i>",
      "to":{
        "name":"all-messages"
      }
    },
    {
      "title":"Reports",
      "htmlBefore":"<i class=\"material-icons\">report</i>",
      "to":{
        "name":"errors"
      }
    }
  ]
},
    
  ];

  if(store.state.auth.role === "superadmin") {
    appRoutes[0].items = [ ...appRoutes[0].items, ...superAdminRoutes];
  }


  return appRoutes;
}
