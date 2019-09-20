import { ICategory } from './../../models/category.model';
import { ITag } from './../../models/tag.model';
import { Component, Inject, Input } from '@angular/core';
import { IPhoto } from '../../models/photo.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-photo-one',
  templateUrl: './photo-one.component.html',
  styleUrls: ['./photo-one.component.scss']
})
export class PhotoOneComponent {
  @Input() photo: IPhoto;
  tags: ITag[];
  categories: ICategory[];


  constructor(public dialogRef: MatDialogRef<PhotoOneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.photo = data.photo;
                this.tags = data.photo.tag;
                this.categories = data.photo.category;
              }

  onClick(): void {
    this.dialogRef.close();
  }

}
