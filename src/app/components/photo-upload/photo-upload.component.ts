import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GalleryService } from './../../services/gallery.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent {
  // Main task
  task: any;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private http: HttpClient,
              private galleryService: GalleryService
    // private storage: AngularFireStorage,
    // private db: AngularFirestore
  ) { }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const fileEvent = event.item(0);

    // Client-side validation example
    if (fileEvent.type.split('/')[0] !== 'image') {
      console.error('unsupported file type... ');
      return;
    }

    const file = new FormData();
    file.append('file', fileEvent);



    // The storage path
    //const path = `test/${new Date().getTime()}_${file.name}`;

    // The main task

    //     this.http.post('http://localhost:8080/images/', file,  {
    //   observe: 'events'
    // }).subscribe(events => {
    //   alert('Succesfully uploaded');
    // });
    //this.task = this.storage.upload(path, file);

    this.galleryService.uploadImage(file).subscribe(events => {
      alert('Succesfully uploaded');
    });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    // The file's download URL
    //this.downloadURL = this.task.downloadURL();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes });
        }
      })
    );
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


}
