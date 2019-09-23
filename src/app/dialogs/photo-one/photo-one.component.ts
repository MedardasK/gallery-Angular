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


  constructor(public dialogRef: MatDialogRef<PhotoOneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.photo = data.photo;
                this.tags = this.photo.tags;
                this.categories = this.photo.categories;
              }

  closeDialog(): void {
    return this.dialogRef.close();
  }

}
