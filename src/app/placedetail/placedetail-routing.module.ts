import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacedetailPage } from './placedetail.page';

const routes: Routes = [
  {
    path: '',
    component: PlacedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacedetailPageRoutingModule {}
