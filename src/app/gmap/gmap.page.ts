import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from '../wp-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google: any;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.page.html',
  styleUrls: ['./gmap.page.scss'],
})
export class GmapPage implements OnInit {
  @Input() id: string;
  data: any;
  placelist: any;
  latdynamic: any;
  londynamic: any;
  xxx: any;
  yyy: any;
  placeL: any;
  map: any;
  // @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('map', { static: true }) mapRef: ElementRef;
  // @ViewChild('map', { static: false }) mapElement: ElementRef;


  constructor(private wpservice: WpServiceService, private route: ActivatedRoute, private router: Router, private geolocation: Geolocation) { }

  ngOnInit() {
    this.showMap();
    // this.loadMap() 
    let id = this.route.snapshot.paramMap.get('id') || this.id;
    this.wpservice.getPlaceDetail(173).subscribe((data) => {
      this.placelist = data;
      this.latdynamic = data['acf']['gmap']['lat'];
      this.londynamic = data['acf']['gmap']['lng'];

      console.log("load Place Detail ...");
      console.log(this.latdynamic);
      console.log("load Lati ...");
      console.log(this.londynamic);
      console.log("load Lon ...");
      console.log(data);
      let xxx = this.londynamic;
      const yyy = this.latdynamic;
    }, error => {
      console.log("errror ", error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data);
    });
  }

  showMap() {
    let location = new google.maps.LatLng(13.7643439, 100.6899729);
    let options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
