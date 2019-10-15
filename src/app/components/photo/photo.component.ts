import { PhotoOneComponent } from '../../dialogs/photo-one/photo-one.component';
import { GalleryService } from './../../services/gallery.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoEditComponent } from 'src/app/dialogs/photo-edit/photo-edit.component';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { IPhoto } from 'src/app/models/photo.model';
import { RefreshService } from 'src/app/services';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: IPhoto;

  constructor(private galleryService: GalleryService,
              private refreshService: RefreshService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog) { }

  async openDialogReview(): Promise<void> {
    this.galleryService.getPhotoById(this.photo.id).subscribe(res => {
      this.dialog.open(PhotoOneComponent, {
        data: { photo: res, photoDetails: this.photo }
      }
      );
    });
  }

  openDialogEdit(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    const dialogRef = this.dialog.open(PhotoEditComponent, {
      width: '80vw',
      data: this.photo
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshService.callComponentMethodLoadPhotos();
    });
  }
}
