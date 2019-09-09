import { PhotoOneComponent } from '../../dialogs/photo-one/photo-one.component';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoEditComponent } from 'src/app/dialogs/photo-edit/photo-edit.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: IPhoto;
  // let data = this.gallery.getPhotoById(this.photo.id);

  constructor(
    private galleryService: GalleryService,
    public dialog: MatDialog) {}

    openDialogReview(): void {
      this.galleryService.getPhotoById(this.photo.id)
        .then(res => {
          const dialogRef = this.dialog.open(PhotoOneComponent, {
            // width: '80vw',
            // height: '80vw',
            data: {photo: res}
          });
        });
    }

    openDialogEdit(): void {
      this.galleryService.getPhotoById(this.photo.id)
        .then(res => {
          const dialogRef = this.dialog.open(PhotoEditComponent, {
            width: '80vw',
            height: '50vw',
            data: {photo: res}
          });
        });
    }
}
