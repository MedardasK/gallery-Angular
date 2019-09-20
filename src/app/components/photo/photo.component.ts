import { PhotoOneComponent } from '../../dialogs/photo-one/photo-one.component';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoEditComponent } from 'src/app/dialogs/photo-edit/photo-edit.component';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: IPhoto;

  constructor(private galleryService: GalleryService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog) {}

  async openDialogReview(): Promise<void> {
    return this.galleryService.getPhotoById(this.photo.id)
      .then(res => {
        this.dialog.open(PhotoOneComponent, {
          data: {photo: res}
        });
      });
  }

  async openDialogEdit(): Promise<void> {
    if (!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    return this.galleryService.getPhotoById(this.photo.id)
      .then(res => {
        this.dialog.open(PhotoEditComponent, {
          width: '80vw',
          height: '62vh',
          data: {photo: res}
        });
    });
  }
}
