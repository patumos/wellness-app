import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from '../wp-service.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-placedetail',
    templateUrl: './placedetail.page.html',
    styleUrls: ['./placedetail.page.scss'],
})
export class PlacedetailPage implements OnInit {

    data: any;
    placelist: any;

    public segment: string = "list1";

    //@ViewChild('map', { static: false }) mapElement: ElementRef;

    private mapElement: ElementRef;
    @ViewChild('map') set content(content: ElementRef) {
        if(content) { // initially setter gets called with undefined
            this.mapElement = content;
        }
    }

    map: any;
    address: string;
    latitude: number;
    longitude: number;
    latdynamic: any;
    londynamic: any;
    store: any;
    storeDetail: any;
    photos: any[];

    id: string;
    showDiss = false;

    ios: boolean;
    android: boolean;

    constructor(private wpservice: WpServiceService, private route: ActivatedRoute, private router: Router, private geolocation: Geolocation, 
        private nativeGeocoder: NativeGeocoder,private callNumber: CallNumber, private emailComposer: EmailComposer, private iab: InAppBrowser, public platform: Platform) {
            this.ios = platform.is('ios');
          this.android = platform.is('android');
         }

    ngOnInit() {
        if (this.id != undefined) {
            this.showDiss = true;
        }
        
        // console.log("showDiss ", this.showDiss);
        // let id = this.route.snapshot.paramMap.get('id') || this.id;
        // console.log("fetching ...");
        // this.wpservice.getPlaceDetail(id).subscribe(data => {
        // let post = JSON.parse(data.data);
        // console.log(" get data ", post);
        // post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        // this.data = post;
        this. id = this.route.snapshot.paramMap.get('id');
        console.log("fetching ...");
        this.wpservice.getPlaceDetail(this.id).subscribe((data) => {
            this.placelist = data;
            this.latdynamic = data['acf']['gmap']['lat'];
            this.londynamic = data['acf']['gmap']['lng'];
            console.log("load Place Detail ...");
            console.log(this.latdynamic);
            console.log("load Lati ...");
            console.log(this.londynamic);
            console.log("load Lon ...");
            console.log(data);
        }, error => {
            console.log("errror ", error);
        });
        // let id = this.route.snapshot.paramMap.get('id') || this.id;
        // console.log("fetching ...");
        // this.wpservice.getPlaceCat().subscribe((data) => {
        //   this.placecatlist = data;      
        //   console.log("load Cat Place ...");
        //   console.log(data);
        // }, error => {
        //   console.log("errror ", error);
        // });
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {

            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            // this.latdynamic = resp.coords.latitude;
            // this.londynamic = resp.coords.longitude;

            let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.map.addListener('dragend', () => {

                this.latitude = this.map.center.lat();
                this.longitude = this.map.center.lng();

                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    loadMapPlace(lat, lng) {

        //if(this.mapElement == null)
            //return;

        this.latitude = lat;
        this.longitude = lng
        // this.latdynamic = resp.coords.latitude;
        // this.londynamic = resp.coords.longitude;

        let latLng = new google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.getAddressFromCoords(lat, lng);
        
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.map.addListener('dragend', () => {

            this.latitude = this.map.center.lat();
            this.longitude = this.map.center.lng();

            this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        });

    }

    getAddressFromCoords(lattitude, longitude) {
        console.log("getAddressFromCoords " + lattitude + " " + longitude);
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = "";
                let responseAddress = [];
                for (let [key, value] of Object.entries(result[0])) {
                    if (value.length > 0)
                        responseAddress.push(value);

                }
                responseAddress.reverse();
                for (let value of responseAddress) {
                    this.address += value + ", ";
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = "Address Not Available!";
            });

    }

    segmentChanged(ev: any) {
        this.segment = ev.detail.value;
    }

    callNow(number) {
        this.callNumber.callNumber(number, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
    }

     mailTo(mail) {
         console.log("mail to ", mail);
         const browser =  this.iab.create('mailto:'+mail,           '_system');
     }

    email2Place(mail) {
        console.log(mail)
        //this.emailComposer.open(mail)
    }

    openMapLink() {
        let geo = this.store['fields']['geolocation'];
        if(geo != null) {
            const browser =  this.iab.create('https://www.google.com/maps/place/'+geo, '_system');
            //const browser =  this.iab.create('maps://?q='+geo, '_system');
        }
    }

    ionViewWillEnter() {
        this.wpservice.getStoreId(this.id).then(res => {
            this.store = JSON.parse(res['data'])[0];
            this.storeDetail = JSON.parse(this.store['fields']['body']);
            console.log(this.store);
            let geo = this.store['fields']['geolocation'];
            if(geo != null) {
                setTimeout(() => {
                    let geocode = geo.split(',');
                    this.loadMapPlace(geocode[0], geocode[1]);
                }, 1000);
            }
        }, 
            error => {
                console.log(error);
            });
        this.wpservice.getStorePhotoId(this.id).then(res => {
            this.photos = JSON.parse(res['data']);
            console.log(this.photos);
        }, 
            error => {
                console.log(error);
            });
    }
}
