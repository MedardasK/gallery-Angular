import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { PhotoUploadComponent } from './views/photo-upload/photo-upload.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    // loadChildren: './views/gallery/gallery.module#GalleryModule'
    // loadChildren: () => import('./views/gallery/gallery.module').then(m => m.GalleryModule)
    component: GalleryComponent
  },
  { path: 'upload', component: PhotoUploadComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
