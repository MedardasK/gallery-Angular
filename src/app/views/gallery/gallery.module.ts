import { GalleryComponent } from './gallery.component';
import { GalleryService } from './../../services/gallery.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    GalleryService
  ]

})
export class GalleryModule { }
