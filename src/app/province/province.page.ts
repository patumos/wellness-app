import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpServiceService } from '../wp-service.service';

@Component({
  selector: 'app-province',
  templateUrl: './province.page.html',
  styleUrls: ['./province.page.scss'],
})
export class ProvincePage implements OnInit {

  data: any;
  provicelist: any;

  constructor( private wpservice: WpServiceService, private route: ActivatedRoute, private router: Router) { }

  @Input() id: string;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') || this.id;
    console.log("fetching ...");
    this.wpservice.getProvPlace().subscribe((data) => {
      this.provicelist = data;      
      console.log("load province ...");
      console.log(data);
    }, error => {
      console.log("errror ", error);
    });
  }

}
