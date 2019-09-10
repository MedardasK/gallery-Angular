import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GalleryService } from './../../services/gallery.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  previewUrl: any = null;

  // State for dropzone CSS toggling
  isHovering: boolean;

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.createForm();
  }

  constructor(private galleryService: GalleryService,
              private fb: FormBuilder
  ) { }

  loadCategories(): void {
    this.galleryService.getCategories()
      .then(data => {
        this.categories = data;
      });
  }

  loadTags(): void {
    this.galleryService.getTags()
      .then(data => {
        this.tags = data;
      });
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
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
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
    // this.upload.patchValue({file: this.fileData});
  }

  private createForm(): void {
    this.upload = this.fb.group({
      file: ['', [Validators.required]],
      description: [],
      categories: [],
      tags: [],
    });
  }

  submitValues() {
    console.log(this.fileData);
    console.log(this.upload.value);
    this.fileData.append('description', this.upload.value);
    this.galleryService.uploadImage(this.fileData).subscribe(events => {
      alert('Successfully uploaded');
    });
  }

}
