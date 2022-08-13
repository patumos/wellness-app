import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WpServiceService } from '../wp-service.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

    email = "";

    constructor(public modalController: ModalController, private wp:WpServiceService) { }

    ngOnInit() {
    }

    async resetPassword() {
        if( this.email == "" ) {
            alert("Please Enter Valid Email");
            return;
        }
        let r = await this.wp.resetPassword(this.email);
        alert(r.msg);
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }

}
