/* eslint-disable max-len */

const loginRequest = () => ({
  data: {
    username: "admin",
    password: "password",
    accessToken:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNTc4Mzk5NTE5LCJleHAiOjE1NzkwMDQzMTl9.TJMpwthclAlOttcye2lQuI8fBe17rjbnAccsaVeJGNoMD19jFlXY6r-Xrn9kaYHbOS_YcKvLTgOy_xWWu66QYQ",
    tokenType: "Bearer",
    navbar: {
      logo: "logo",
      menus: [
        {
          key: "REPORTS",
          description: "Reports",
          icon: "area-chart",
          items: [],
          url: null,
          order: 0
        },
        {
          key: "MANAGE_USERS",
          description: "Manage Users",
          icon: "setting",
          items: [],
          url: "/administration",
          order: 2
        },
        {
          key: "KNOWLEDGE",
          description: "Knowledge",
          icon: "bulb",
          items: [],
          url: null,
          order: 1
        },
        {
          key: "USERS",
          description: "Profile",
          icon: "user",
          items: [
            {
              key: "VIEW_PROFILE",
              description: "View Profile",
              icon: null,
              items: [],
              url: "/user-information",
              order: 0,
              type: "GET"
            },
            {
              key: "LOGOUT",
              description: "Logout",
              icon: "logout",
              items: [],
              url: "/login",
              order: 1,
              type: "GET"
            }
          ],
          url: null,
          order: 3
        }
      ]
    },
    role: "ROLE_ADMIN",
    permissions: [
      "VIEW_USERS",
      "CREATE_USER",
      "VIEW_OWN_USER",
      "DISABLE_USER",
      "MODIFY_USER"
    ]
  }
});

const logoutRequest = () => ({});

export default () => ({
  loginRequest,
  logoutRequest
});
