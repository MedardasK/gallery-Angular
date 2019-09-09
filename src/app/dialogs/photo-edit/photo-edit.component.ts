import { Component, Inject, Input } from '@angular/core';
import { IPhoto } from '../../models/photo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent {
  @Input() photo: IPhoto;
  descriptionString = '';
  fileNameString = '';
  editSuccessful = false;

  constructor(public dialogRef: MatDialogRef<PhotoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient ) {
    this.photo = data.photo;
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const properties = new FormData();
    properties.append('description', this.descriptionString);

    this.http.post('http://localhost:8080/images/', properties,  {

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
