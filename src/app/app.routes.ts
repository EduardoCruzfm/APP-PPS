import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirige la ruta raíz a "login"
  { path: "login", component: LoginPage},
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/auth/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
 
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
];
