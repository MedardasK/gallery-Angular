import { GalleryService } from './../../services/gallery.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { IPhoto } from '../../models/photo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
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

    this.http.post('http://localhost:8080/images/update/', this.photo,  {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(events => {
      if (events.type === HttpEventType.Response) {
        this.editSuccessful = true;
      }
    });
  }

}
