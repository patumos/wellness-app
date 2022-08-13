import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class WpServiceService {

    public login$: EventEmitter<any>;
    public openLogin$: EventEmitter<any>;
    
    //HOST = "http://localhost:8000";
    HOST = "https://wellnessroute.info";
    APP_URL = "https://api.wellnessroute.info"+"/api";
    API_BASE = this.HOST+"/wellness/api/";
    STATIC_BASE = this.HOST+"/static/";
    MEDIA_BASE = this.HOST+"/media/";

    constructor(private http: HttpClient, private httpNative: HTTP, private storage:Storage) { 

        this.login$ = new EventEmitter();
        this.openLogin$ = new EventEmitter();
        this.storage.set('lastUpdate', new Date());
    }

    getSlideshow() {
        return this.http.get(
            "/assets/json/slideshow.json"
            // "http://tamtime.iamarray.xyz/wp-json/wp/v2/slideshow?_embed"
        );
    }

    getStores() {
        return this.httpNative.get(this.API_BASE + "stores", {}, {});
    }
    search(s) {
        return this.httpNative.get(this.API_BASE + "search", {q: s}, {});
    }
    getStoreId(id) {
        return this.httpNative.get(this.API_BASE + "stores/"+id, {}, {});
    }
    getNearPlace(location) {
        return this.httpNative.get(this.API_BASE + "nearme?location="+location, {}, {});
    }
    getStorePhotoId(id) {
        return this.httpNative.get(this.API_BASE + "stores/"+id+"/photos", {}, {});
    }

    getLasted() {
        return this.http.get(
            "/assets/json/place.json"
            // "http://tamtime.iamarray.xyz/wp-json/wp/v2/place?_embed"
        );
    }

    getNear() {
        return this.http.get(
            "/assets/json/place.json"
            // "http://tamtime.iamarray.xyz/wp-json/wp/v2/place?_embed"
        );
    }

    getPlaceDetail(id) {
        return this.http.get(
            // "http://tamtime.iamarray.xyz/wp-json/wp/v2/place/"+id+"/?_embed"
            "/assets/json/place173.json"
        );
    }

    getProvPlace() {
        return this.http.get(
            "http://tamtime.iamarray.xyz/wp-json/wp/v2/place?province=8"
        )
    }

    getPlaceCat() {
        return this.http.get(
            "http://tamtime.iamarray.xyz/wp-json/wp/v2/place?placecat=17"
        )
    }

    storeFbData(data) {
        console.log("store fb");
        console.log(data);
        this.httpNative.setDataSerializer('json');
        return this.httpNative.post(this.APP_URL + "/store_fb", data, {})
            .then( res => {
                console.log(res);
                return res;
            },
                error => {
                    console.log(error);
                    return error;
                });
    }
    registerUser(form) {

        this.httpNative.setDataSerializer('json');
        return this.httpNative.post(this.APP_URL + "/register", form, {})
            .then( res => {
                console.log(res);
                return JSON.parse(res.data);
            },
                error => {
                    console.log(error);
                    return error;
                });
    }
    loginUser(form) {

        this.httpNative.setDataSerializer('json');
        return this.httpNative.post(this.APP_URL + "/user_login", form, {})
            .then( res => {
                console.log(res);
                return JSON.parse(res.data);
            },
                error => {
                    console.log(error);
                    return error;
                });
    }
    resetPassword(email) {

        this.httpNative.setDataSerializer('json');
        return this.httpNative.get(this.APP_URL + "/resetpass/"+email, {}, {})
            .then( res => {
                console.log(res);
                return JSON.parse(res.data);
            },
                error => {
                    console.log(error);
                    return error;
                });
    }

}

