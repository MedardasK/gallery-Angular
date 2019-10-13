import { IPhotoFull } from './../../models/photo-full.model';
import { ICategory } from './../../models/category.model';
import { ITag } from './../../models/tag.model';
import { Component, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-photo-one',
  templateUrl: './photo-one.component.html',
  styleUrls: ['./photo-one.component.scss']
})
export class PhotoOneComponent {
  @Input() photo: IPhotoFull;
  tags: ITag[];
  categories: ICategory[];
  fullPhoto: any;
  photoDetails: IPhotoFull;
  isLoaded = false;

  constructor(public dialogRef: MatDialogRef<PhotoOneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.fullPhoto = this.createImage(data.photo);
                this.photoDetails = data.photoDetails;
                this.tags = this.photoDetails.tags;
                this.categories = this.photoDetails.categories;
                this.isLoaded = true;
              }

  closeDialog(): void {
    return this.dialogRef.close();
  }

  createImage(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.fullPhoto = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
