import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonSlides } from '@ionic/angular';

import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      PipeModule,
    HomePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
