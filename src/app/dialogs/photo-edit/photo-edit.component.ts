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
  categoriesLoad: ICategory[];
  tagsLoad: ITag[];
  updateData = new FormData();

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
      this.categoriesLoad = data;
    });
  }

  private loadTags(): void {
    this.galleryService.getTags()
    .then(data => {
      this.tagsLoad = data;
    });
  }

  createForm(): void {
    this.editForm = this.fb.group({
      description: ['', Validators.minLength(3)],
      name: ['', Validators.minLength(1)],
      categoryForm: ['', Validators.required],
      tagForm: ['', Validators.required],
    });
  }

  private submitValues(): void {
    const updateData = new FormData();
    this.photoDetails = this.editForm.value;
    updateData.append('description', this.photoDetails.description);
    updateData.append('name', this.photoDetails.name);
    updateData.append('categories', JSON.stringify(this.editForm.get('categoryForm').value));
    updateData.append('tags', JSON.stringify(this.editForm.get('tagForm').value));

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
        });
      }
    });
  }

}
