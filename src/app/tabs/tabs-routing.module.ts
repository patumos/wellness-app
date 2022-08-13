import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'register-form',
        loadChildren: () => import('../register-form/register-form.module').then(m => m.RegisterFormPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('../reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
      },
     {
         path: 'placecat',
         children: [
             {
                 path: ':id',
                 loadChildren: () => import('../place/place.module').then(m => m.PlacePageModule)
             }
         ]
      },
      {
        path: 'place',
        children: [
          {
            path: '',
            loadChildren: () => import('../place/place.module').then(m => m.PlacePageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../placedetail/placedetail.module').then(m => m.PlacedetailPageModule)
          }
        ]
      },
      {
        path: 'province',
        loadChildren: () => import('../province/province.module').then(m => m.ProvincePageModule)
      },
      {
        path: 'gmap',
        loadChildren: () => import('../gmap/gmap.module').then(m => m.GmapPageModule)
      },
      {
        path: 'nearme',
        loadChildren: () => import('../nearme/nearme.module').then( m => m.NearmePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
