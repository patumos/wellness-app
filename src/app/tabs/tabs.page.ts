import { Component } from '@angular/core';

import { WpServiceService } from '../wp-service.service';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { ProfilePage } from '../profile/profile.page';
import { LoginPage } from '../login/login.page';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    //constructor() {}
    
    constructor(private wp: WpServiceService, private storage:Storage, public modalController: ModalController, private iab: InAppBrowser) {

        this.wp.openLogin$.subscribe( data => {
            this.openLogin(data);
        });
    }

    async openLogin(data) {

        console.log("open login ..");
        console.log(data);

        let u = await this.storage.get('user');
        if( u != null ) {
            const modal = await this.modalController.create({
                component: ProfilePage,
                componentProps: {action: data}
            });
            return await modal.present();
        }else {
            const modal = await this.modalController.create({
                component: LoginPage
            });
            return await modal.present();
        }
    }

}
