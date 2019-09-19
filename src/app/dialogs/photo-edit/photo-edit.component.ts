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
  }

  onClick(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.editForm = this.fb.group({
      description: [],
      fileName: ['', Validators.minLength(1)]
    });
  }
  submitValues() {

    const updateData = new FormData();
    this.photoDetails = this.editForm.value;
    updateData.append('description', this.photo.data);

    this.photo.description = this.photoDetails.description;
    this.photo.name = this.photoDetails.description;
    this.photo.category = this.photoDetails.category;
    this.photo.tag = this.photoDetails.tag;


    this.galleryService.updateImage(updateData).subscribe(events => {
      this.snackBar.open('Successfully updated!', '', {
        duration: 3000
      });
    });
  }

  confirmDeleteDialog(): Promise<void> {

      return this.dialog.open(DeleteConfirmComponent
        //   , { data: {this.photo.} }
          );
        }

}
