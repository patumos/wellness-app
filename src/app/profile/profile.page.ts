import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user2: any;
    user: any;

    constructor(private storage:Storage, private router:Router, public modalController: ModalController) { }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        this.user2 = this.storage.get('user');
        //console.log(this.user);
    }
    async logout() {
        await this.storage.remove('user');
        this.modalController.dismiss({
            'dismissed': true
        });
        //this.router.navigate(['/tabs/home']);

    }


    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

}
