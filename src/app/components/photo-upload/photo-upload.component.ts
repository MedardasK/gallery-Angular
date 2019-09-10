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
  // Main task
  task: any;

  categoryControl = new FormControl();
  tagControl = new FormControl();
  upload: FormGroup;
  categories: ICategory[] = [];
  tags: ITag[] = [];

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    this.createForm();
  }

  constructor(private http: HttpClient,
              private galleryService: GalleryService,
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
    // The File object
    const fileData = event.item(0);

    // Client-side validation example
    if (fileData.type.split('/')[0] !== 'image') {
      console.error('unsupported file type... ');
      return;
    }

    const file = new FormData();
    file.append('file', fileData);
    file.append('description', this.upload.value);
    this.photo = fileData;


    // The storage path
    //const path = `test/${new Date().getTime()}_${file.name}`;

    // The main task

    //     this.http.post('http://localhost:8080/images/', file,  {
    //   observe: 'events'
    // }).subscribe(events => {
    //   alert('Succesfully uploaded');
    // });
    // this.task = this.storage.upload(path, file);



    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    this.downloadURL = this.task.downloadURL();
    console.log(this.downloadURL);

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log('upload complete');
        return undefined;

        // if (snap.bytesTransferred === snap.totalBytes) {
        //   // Update firestore on completion
        //   this.db.collection('photos').add( { path, size: snap.totalBytes });
      })
    );

  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  private createForm(): void {
    this.upload = this.fb.group({
      // file: ['', [Validators.required]],
      file: [],
      description: [],
      categories: [],
      tags: [],
    });
  }
  submitValues() {

    // this.task = this.galleryService.uploadImage(file).subscribe(events => {
    //   alert('Successfully uploaded');
    // });
    console.log(this.upload.value);
  }

}
