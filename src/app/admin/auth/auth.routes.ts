import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./login-component/login-component").then(
      (m) => m.LoginComponent
    ),
  },
  {
    path: "register",
    loadComponent: () => import("./register-component/register-component").then(
      (m) => m.RegisterComponent
    ),
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./forgot-password-component/forgot-password-component").then(
      (m) => m.ForgotPasswordComponent
    ),
  }
]
