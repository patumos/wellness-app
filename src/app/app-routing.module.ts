import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register-form',
    loadChildren: () => import('./register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'placedetail',
    loadChildren: () => import('./placedetail/placedetail.module').then( m => m.PlacedetailPageModule)
  },
  {
    path: 'place',
    loadChildren: () => import('./place/place.module').then( m => m.PlacePageModule)
  },
  {
    path: 'province',
    loadChildren: () => import('./province/province.module').then( m => m.ProvincePageModule)
  },
  {
    path: 'gmap',
    loadChildren: () => import('./gmap/gmap.module').then( m => m.GmapPageModule)
  },
  {
    path: 'nearme',
    loadChildren: () => import('./nearme/nearme.module').then( m => m.NearmePageModule)
  },
  {
    path: 'sample',
    loadChildren: () => import('./sample/sample.module').then( m => m.SamplePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
