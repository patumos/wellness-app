import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageServerPipe } from '../image-server.pipe';


@NgModule({
    declarations: [ImageServerPipe],
    imports: [
        CommonModule
    ],
    exports: [ImageServerPipe]
})
export class PipeModule { }
