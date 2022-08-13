import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { WpServiceService } from '../wp-service.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';

import { ProfilePage } from '../profile/profile.page';
import { RegisterFormPage } from '../register-form/register-form.page';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    registerForm = { email: "", password: "" };
    isAndroid = false;

    constructor(private fb: Facebook, private wp: WpServiceService, private storage: Storage, private router:Router, public modalController: ModalController, private signInWithApple:  SignInWithApple, private platform: Platform) { }


    ngOnInit() {
        if (this.platform.is('android')) {
            this.isAndroid = true;
            console.log("Android");
        }else {
            console.log("Other");
        }
    }

    async openRegister() {
        this.modalController.dismiss({
            'dismissed': true
        });
        const modal = await this.modalController.create({
            component: RegisterFormPage,
        });
        return await modal.present();
    }
    async openForgotPassword() {
        this.modalController.dismiss({
            'dismissed': true
        });
        const modal = await this.modalController.create({
            component: ForgotPasswordPage,
        });
        return await modal.present();
    }

    async userLogin() {
        console.log(this.registerForm);
        if( this.registerForm.email == "" || this.registerForm.password == "" ) {
            alert("Please enter email and password");
            return;
        }
        let res = await this.wp.loginUser(this.registerForm);
        console.log(res);
        if(res.error == true) {
            alert(res.msg)
        }else {
            alert("Login Success");
            this.storage.set('user', {name: res.output.firstName + " "+res.output.lastName, email: res.output.email});
            this.dismiss();
        }

    }

    doFbLogin() {
        this.fb.login(['public_profile',  'email'])
            .then((res: FacebookLoginResponse) =>{
                console.log('Logged into Facebook!', res);

                this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(async profile => {
                    console.log(profile);
                    let abc = await this.wp.storeFbData(profile);
                    console.log(JSON.parse(abc.data));
                    this.storage.set('user', profile);
                    //this.router.navigate(['/profile']);
                    this.modalController.dismiss({
                        'dismissed': true
                    });
                    const modal = await this.modalController.create({
                        component: ProfilePage,
                    });
                    return await modal.present();
                });

            })
            .catch(e => console.log('Error logging into Facebook', e));


    }
    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }
    appleSignIn() {
        this.signInWithApple.signin({
            requestedScopes: [
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
            ]
        })
            .then((res: AppleSignInResponse) => {
                // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
                //alert('Send token to apple for verification: ' + res.identityToken);
                console.log("send token");
                console.log(res);
                //alert(res);
                this.wp.storeFbData(res).then( data => {
                    console.log(data);
                }, error => {
                    console.log(error);
                } );
                this.storage.set('user', { name: res.fullName.givenName + " "+res.fullName.familyName, email: res.email });
                this.dismiss();
            })
            .catch((error: AppleSignInErrorResponse) => {
                alert(error.code + ' ' + error.localizedDescription);
                console.error(error);
            });
    }
}
