import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from '../wp-service.service';

@Component({
    selector: 'app-place',
    templateUrl: './place.page.html',
    styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {

    data: any;
    placecatlist: any;

    constructor(private wpservice: WpServiceService, private route: ActivatedRoute, private router: Router) { }

    id: string;
    //id = null

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log("fetching ...", this.id);
        this.wpservice.getPlaceCat().subscribe((data) => {
            this.placecatlist = data;      
            console.log("load Cat Place ...");
            console.log(data);
        }, error => {
            console.log("errror ", error);
        });
    }


    ionViewWillEnter() {
        this.wpservice.getStoreId(this.id).then(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }
}
