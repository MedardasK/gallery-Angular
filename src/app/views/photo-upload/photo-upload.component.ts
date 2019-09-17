import { IPhotoUpload } from './../../models/photo-upload.model';
import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ITag } from '../../models/tag.model';
import { ICategory } from '../../models/category.model';
import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TagsCategoriesComponent } from 'src/app/dialogs';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  @Input() photo: any;
  categoryControl = new FormControl();
  tagControl = new FormControl();
  upload: FormGroup;
  fileControl = new FormControl();
  categories: ICategory[] = [];
  tags: ITag[] = [];
  fileData = new FormData();
  duration = 5000;
  image: IPhotoUpload = {} as IPhotoUpload;
  imageFile: File;

  previewUrl: any;

  // State for dropzone CSS toggling
  isHovering: boolean;

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.createForm();
  }

  constructor(private galleryService: GalleryService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private auth: AuthService,
              private dialog: MatDialog) { }

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


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) { // blob
    const fileData = event.item(0);
    this.imageFile = event.item(0);
    if (fileData.type.split('/')[0] !== 'image') {
      console.error('unsupported file type... ');
      return;
    }
    if (this.fileData.has('file')) {
      this.fileData.delete('file');
    }
    this.fileData.append('file', fileData);

    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  private createForm(): void {
    this.upload = this.fb.group({
      description: [],
      categories: [],
      tags: [],
    });
  }

  submitValues() {
    this.image = this.upload.value;
    this.fileData.append('description', this.image.description);
    this.fileData.append('tags', this.image.tags !== null ? this.image.tags.toString() : '');
    this.fileData.append('categories', this.image.categories !== null ? this.image.categories.toString() : '');

    this.galleryService.uploadImage(this.fileData).subscribe(events => {
      this.snackBar.open('Successfully uploaded!', '', {
        duration: 3000
      });
    });
  }

  openDialogCreate(): void {
    if (!this.auth.loggedIn) {
      console.log(this.auth.loggedIn);
      this.router.navigate(['login']);
      return;
    }
    this.dialog.open(TagsCategoriesComponent);
  }

}
