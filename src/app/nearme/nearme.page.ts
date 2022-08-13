import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { WpServiceService } from '../wp-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google: any;


@Component({
    selector: 'app-nearme',
    templateUrl: './nearme.page.html',
    styleUrls: ['./nearme.page.scss'],
})
export class NearmePage implements OnInit {

    @ViewChild('nearmap', { static: true }) mapRef: ElementRef;  

    nearmap: any;
    placenear: any = [];

    stores: any;

    constructor(private wpservice: WpServiceService, private geolocation: Geolocation) { }

    ngOnInit() {

        //this.showMap();
        //console.log(this.mapRef.nativeElement);  
        /*
        this.wpservice.getNear().subscribe((placeneardata) => {
            this.placenear = placeneardata;
            console.log('load Near Place');
            console.log(placeneardata);
        });*/

    }

    ionViewWillEnter() {
        this.showMap(); 
    }
    showMap() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp);
            let location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let options = {
                center: location,
                zoom: 15,
                disableDefaultUI: true
            }
            this.nearmap = new google.maps.Map(this.mapRef.nativeElement, options);
            let marker = new google.maps.Marker({
                position: location,
                title:"I am here"
            });
            marker.setMap(this.nearmap);

            this.wpservice.getNearPlace(resp.coords.latitude + ","+resp.coords.longitude).then( res => {
            //this.wpservice.getNearPlace("12.598582652246053,102.11331360791682").then( res => {
                console.log(res);
                this.stores = JSON.parse(res['data']);
                //this.stores = JSON.parse(abc['stores']);
                console.log(this.stores);
            },
            error => {
                console.log(error);
            }); 
        });
    }

}
