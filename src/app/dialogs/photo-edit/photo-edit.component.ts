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
  editSuccessful = false;
  editForm: FormGroup;
  categoryControl = new FormControl();
  tagControl = new FormControl();
  adminBoolean = false;
  dataDelete: number;
  categories: ICategory[] = [];
  tags: ITag[] = [];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private auth: AuthService,
              private galleryService: GalleryService,
              private dialog: MatDialog ) {
              this.photo = data.photo;
  }

  ngOnInit() {
    this.createForm();
    this.adminBoolean = this.auth.isAdmin();
    this.loadCategories();
    this.loadTags();
  }

  private loadCategories(): void {
    this.galleryService.getCategories()
    .then(data => {
      this.categories = data;
    });
  }

  private loadTags(): void {
    this.galleryService.getTags()
    .then(data => {
      this.tags = data;
    });
  }

  createForm(): void {
    this.editForm = this.fb.group({
      description: ['', Validators.minLength(3)],
      name: ['', Validators.minLength(1)]
    });
  }

  private submitValues(): void {
    const updateData = new FormData();
    this.photoDetails = this.editForm.value;
    updateData.append('description', this.photoDetails.description);
    updateData.append('name', this.photoDetails.name);
    console.log(this.photoDetails.description);
    console.log(this.photoDetails.name);
    updateData.append('tag', JSON.stringify(
      this.photoDetails.tags !== null ? this.photoDetails.tags : this.photo.tags));
    updateData.append('category', JSON.stringify(
      this.photoDetails.categories !== null ? this.photoDetails.categories : this.photo.categories));
    updateData.append('category', JSON.stringify(this.photoDetails.categories));

    this.galleryService.updateImage(this.photo.id, updateData).subscribe(() => {
      this.snackBar.open('Successfully updated!', '', {
        duration: 3000
      });
    });
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
        });
      }
    });
  }

}
