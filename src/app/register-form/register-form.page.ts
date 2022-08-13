import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { WpServiceService } from '../wp-service.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.page.html',
    styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

    registerForm  = {firstName: "", lastName: "", email: "", password:"", confirmPassword: ""};
    errorText = null;

    constructor(private wpdataService: WpServiceService, private modalController: ModalController) { }

    ngOnInit() {
    }

    async register() {
        console.log(this.registerForm);
        if( this.registerForm.password != this.registerForm.confirmPassword ) {
            this.errorText = "Password not matched !!!";
        }else{
            let res = await this.wpdataService.registerUser(this.registerForm);
            if(res.error == true) {
                alert(res.msg)
            }else {
                alert("Register Success");
                this.dismiss();


            }
        }

    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
