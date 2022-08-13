import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient} from '@angular/common/http';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';

import { PipeModule } from './pipe/pipe.module';
import { Facebook } from '@ionic-native/facebook/ngx';

// import { IonicImageViewerModule } from 'ionic-img-viewer';


// library.add(fas,far,fab);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [HttpClientModule, BrowserModule, PipeModule,IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule,   IonicStorageModule.forRoot()],
    providers: [
        Geolocation,
        NativeGeocoder,
        CallNumber,
        EmailComposer,
        InAppBrowser,
        HTTP,
        Facebook, 
        SignInWithApple,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab, far);
    }

}
