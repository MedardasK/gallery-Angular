import { GalleryService } from './../../services/gallery.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { IPhoto } from '../../models/photo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private galleryService: GalleryService ) {
              this.photo = data.photo;
  }

  ngOnInit() {
    this.createForm();
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

    const data = new FormData();
    this.photoDetails = this.editForm.value;
    data.append('description', this.photo.data);

    this.photo.description = this.photoDetails.description;
    this.photo.name = this.photoDetails.description;
    this.photo.category = this.photoDetails.category;
    this.photo.tag = this.photoDetails.tag;


    this.galleryService.updateImage(this.photo).subscribe(events => {
      this.snackBar.open('Successfully updated!', '', {
        duration: 3000
      });
    });
  }

  deletePicture() {
    this.galleryService.deleteImage(this.photo.id).subscribe(events => {
      this.snackBar.open('Successfully deleted!', '', {
        duration: 3000
      });
    });
  }

}
