import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacedetailPageRoutingModule } from './placedetail-routing.module';

import { PlacedetailPage } from './placedetail.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      PipeModule, 
    PlacedetailPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PlacedetailPage]
})
export class PlacedetailPageModule {}
