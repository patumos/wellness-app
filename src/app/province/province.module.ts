import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvincePageRoutingModule } from './province-routing.module';

import { ProvincePage } from './province.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvincePageRoutingModule
  ],
  declarations: [ProvincePage]
})
export class ProvincePageModule {}
