import { Component, OnInit, Input } from '@angular/core';
import { GalleryService } from './../../services/gallery.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ITag } from './../../models/tag.model';
import { ICategory } from './../../models/category.model';

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

  previewUrl: any;

  // State for dropzone CSS toggling
  isHovering: boolean;

  ngOnInit() {
    this._loadCategories();
    this._loadTags();
    this.createForm();
  }

  constructor(private galleryService: GalleryService,
              private fb: FormBuilder
  ) { }

  _loadCategories(): void {
    this.galleryService.getCategories()
      .then(data => {
        this.categories = data;
      });
  }

  _loadTags(): void {
    this.galleryService.getTags()
      .then(data => {
        this.tags = data;
      });
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) { //blob
    const fileData = event.item(0);

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
    this.fileData.append('description', this.upload.value);
    this.galleryService.uploadImage(this.fileData).subscribe(events => {
      alert('Successfully uploaded');
    });
  }

}
