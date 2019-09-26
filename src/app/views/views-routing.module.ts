import { GalleryComponent } from '.';
import { GalleryService } from '../services/gallery.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: GalleryComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [
        GalleryService
    ],
    exports: [RouterModule]
})
export class ViewsRoutingModule { }
