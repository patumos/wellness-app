import { Pipe, PipeTransform } from '@angular/core';

import { WpServiceService } from './wp-service.service';

@Pipe({
  name: 'imageServer'
})
export class ImageServerPipe implements PipeTransform {

  constructor(private wpservice: WpServiceService) { }

  transform(value: string): string {
    return this.wpservice.MEDIA_BASE + value;
  }

}
