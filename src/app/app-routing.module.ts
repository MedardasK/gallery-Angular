import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GalleryComponent},
  { path: 'upload', component: PhotoUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
