import { ITag } from './../../models/tag.model';
import { ICategory } from './../../models/category.model';
import { GalleryService } from './../../services/gallery.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { IPhoto } from '../../models/photo.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  @Input() photo: IPhoto;
  photoDetails: IPhoto;
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

  onClick(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.editForm = this.fb.group({
      description: ['', Validators.minLength(3)],
      fileName: ['', Validators.minLength(1)]
    });
  }

  submitValues() {
    const updateData = new FormData();
    this.photoDetails = this.editForm.value;
    updateData.append('description', this.photo.description);
    updateData.append('id', this.photo.id);
    updateData.append('tag', JSON.stringify(this.photoDetails.tag));
    updateData.append('category', JSON.stringify(this.photoDetails.category));

    this.galleryService.updateImage(updateData).subscribe(events => {
      this.snackBar.open('Successfully updated!', '', {
        duration: 3000
      });
    });
  }

  confirmDeleteDialog(): Promise<void>  {
    return this.dialog.open(DeleteConfirmComponent), {
      data: { dataDelete: this.data.id }
    };
  }

}
