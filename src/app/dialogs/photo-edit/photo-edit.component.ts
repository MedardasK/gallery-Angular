import { UsersService } from './../../services/users.service';
import { ITag } from './../../models/tag.model';
import { ICategory } from './../../models/category.model';
import { GalleryService } from './../../services/gallery.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { IPhotoFull } from 'src/app/models/photo-full.model';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  @Input() photo: IPhotoFull;
  photoDetails: IPhotoFull;
  categories = [];
  tags = [];
  description = '';
  fileName = '';
  adminBoolean = false;
  updateData = new FormData();

  constructor(public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private userService: UsersService,
              private galleryService: GalleryService,
              private dialog: MatDialog ) {
              this.photo = data.photo;
  }

  ngOnInit() {
    this.adminBoolean = this.userService.isAdmin();
    this.loadPhotoValues();
  }

  loadPhotoValues(): void {
    this.categories = [];
    this.tags = [];
    this.description = this.photo.description;
    console.log(this.description);
    console.log(this.photo.description);
    this.fileName = '';
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
        }
        ,
        () => {
          this.snackBar.open('Error occurred, please try again later!', '', {
            duration: 3000,
            panelClass: 'snackbar-container'
          });
        }
        );
      }
    });
  }

}
