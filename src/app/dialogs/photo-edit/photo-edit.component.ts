import { UsersService } from './../../services/users.service';
import { GalleryService } from './../../services/gallery.service';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { IPhotoFull } from 'src/app/models/photo-full.model';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent {
  @Input() photo: IPhotoFull;
  photoDetails: IPhotoFull;
  categories = [];
  tags = [];
  description = 'asd';
  fileName = '';
  photoThumbnail: any;
  adminBoolean = false;
  updateData = new FormData();

  constructor(public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private userService: UsersService,
              private galleryService: GalleryService,
              private dialog: MatDialog ) {
              this.adminBoolean = this.userService.isAdmin();
              this.photo = data;
              this.photoThumbnail = data.data;
              this.description = this.photo.description;
              this.fileName = this.photo.name;
              this.categories = this.photo.categories;
              this.tags = this.photo.tags;
  }

  private submitValues(): void {
    if (this.description === '' || this.fileName === ''
        || this.categories === [] || this.tags === []) {
          return ;
    }
    const updateData = new FormData();
    updateData.append('description', this.description);
    updateData.append('name', this.fileName);
    updateData.append('categories', JSON.stringify(this.categories));
    updateData.append('tags', JSON.stringify(this.tags));

    this.galleryService.updateImage(this.photo.id, updateData).subscribe(() => {
      this.snackBar.open('Successfully updated!', '', {
        duration: 3000
      });
    },
    () => {
      this.snackBar.open('Error occurred, please try again later!', '', {
        duration: 3000,
        panelClass: 'snackbar-container'
      });
    }
    );
  }

  confirmDeleteDialog(): void {
    const confirm = this.dialog.open(DeleteConfirmComponent, {
      data : { data: false }
    });

    confirm.afterClosed()
      .subscribe(data => {
      if (data === true) {
        this.galleryService.deleteImage(this.photo.id)
        .subscribe(() => {
          this.snackBar.open('Successfully deleted!', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        () => {
          this.snackBar.open('Error occurred, please try again later!', '', {
            duration: 3000,
            panelClass: 'snackbar-container'
          });
        });
      }
    });
  }

}
