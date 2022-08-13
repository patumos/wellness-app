import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearmePageRoutingModule } from './nearme-routing.module';

import { NearmePage } from './nearme.page';

import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      PipeModule,
    NearmePageRoutingModule
  ],
  declarations: [NearmePage]
})
export class NearmePageModule {}
