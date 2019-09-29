import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ITag } from '../../models/tag.model';
import { ICategory } from '../../models/category.model';
import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  categories = [];
  description = '';
  // upload = new FormGroup({
  //   tagForm: new FormControl(),
  //   categoryForm: new FormControl(),
  // });
  fileControl = new FormControl();
  categoriesLoad: ICategory[];
  categoriesArray: ICategory[];
  tagsLoad: ITag[];
  fileData = new FormData();
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
        this.categoriesLoad = data;
      });
  }

  private loadTags(): void {
    this.galleryService.getTags()
      .then(data => {
        this.tagsLoad = data;
      });
  }


  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {
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
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  private createForm(): void {
    this.upload = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      tag: ['', Validators.required],
      fileForm: ['', Validators.required]
  });
  }

  private submitValues(): void {
    this.fileData.append('description', this.upload.get('description').value);
    this.fileData.append('categories', JSON.stringify(this.upload.get('category').value));
    this.fileData.append('tags', JSON.stringify(this.upload.get('tag').value));
    this.galleryService.uploadImage(this.fileData).subscribe(() => {
      this.deleteFormData();
      this.snackBar.open('Successfully uploaded!', '', {
        duration: 3000,
        panelClass: 'snackbar-container'
      });
    },
    () => {
      this.deleteFormData();
      this.snackBar.open('Error occurred, please try again later!', '', {
        duration: 3000,
        panelClass: 'snackbar-container'
      });
    }
    );
  }

  private deleteFormData(): void {
    this.upload.reset();
    this.previewUrl = null;
    this.fileData.delete('description');
    this.fileData.delete('categories');
    this.fileData.delete('tags');
  }

  openDialogCreate(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    const dialogRef = this.dialog.open(TagsCategoriesComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadCategories();
      this.loadTags();
    });
  }

}
