import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WpServiceService } from '../wp-service.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    imageslide :any = [];
    placelasted :any = [];
    sliderOne: any;

    rndLower: number;
    rndUpper: number;
    catName: string = "all";
    searchText: string = '';
    prov: string = "all";
    slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true
    };

    stores: any;
    storeSlide: any;

    constructor(public navCtrl: NavController, private wpservice: WpServiceService) { }

    ngOnInit() {

    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    ionViewWillEnter() {

        /*this.wpservice.getSlideshow().subscribe((data) => {
            this.imageslide = data;
            console.log('load imageslide');
        });*/
        /*
        this.wpservice.getLasted().subscribe((placedata) => {
            this.placelasted = placedata;
            console.log('load Place');
            console.log(placedata);
        });*/        
        this.wpservice.getStores().then( res => {
            console.log(res);
            this.stores = JSON.parse(res['data']);
            this.storeSlide = this.stores;
            this.shuffleArray(this.storeSlide);
            this.rndLower = Math.floor(Math.random() * 1);
            this.rndUpper = Math.floor(Math.random() * this.stores.length);
            //this.stores = JSON.parse(abc['stores']);
            console.log(this.stores);
        },
            error => {
                console.log(error);
            }); 
    }
    searchChange($event) {
        //console.log("search change");
        console.log(this.searchText);
        if( this.searchText != "" ) {

            this.wpservice.search(this.searchText).then(res => {
                this.stores = JSON.parse(res['data']);
                //console.log(d0);
            }, error => {
                console.log(error);
            });
        }else {

            this.wpservice.getStores().then( res => {
                console.log(res);
                this.stores = JSON.parse(res['data']);

                this.rndLower = Math.floor(Math.random() * 1);
                //this.rndUpper = Math.floor(Math.random() * this.stores.length);
                this.rndUpper = Math.floor(Math.random() * this.stores.length);

                //this.stores = JSON.parse(abc['stores']);
                console.log(this.stores);
            },
                error => {
                    console.log(error);
                }); 
        }
    }
    filterCat(catName) {
        if(catName == this.catName) {
            this.catName = "all";

        }else {
            this.catName = catName;
        }
        this.prov = "all";
    }
    changeProvince(prov) {
        this.catName = "all";
        this.prov = prov;
    }

}
