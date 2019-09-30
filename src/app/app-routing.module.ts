import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./views/gallery/gallery.module').then(m => m.GalleryModule)
  },
  { path: 'upload',
    loadChildren: () => import('./views/photo-upload/photo-upload.module').then(m => m.PhotoUploadModule),
    canActivate: [AuthGuard]
  },
  { path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
