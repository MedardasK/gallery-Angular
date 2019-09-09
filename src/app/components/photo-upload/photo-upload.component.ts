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
    //task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;

    snapshot: Observable<any>;

    // Download URL
    downloadURL: Observable<string>;

    // State for dropzone CSS toggling
    isHovering: boolean;

    constructor( private http: HttpClient,
                 private galleryService: GalleryService
      // private storage: AngularFireStorage,
      // private db: AngularFirestore
      ) { }


    toggleHover(event: boolean) {
      this.isHovering = event;
    }

    startUpload(event: FileList) {
      // The File object
      const file = event.item(0);

      const file1 = new FormData();
      file1.append('file', file);

      // Client-side validation example
      // if (file.type.split('/')[0] !== 'image') {
      //   console.error('unsupported file type :( ');
      //   return;
      // }

      // The storage path
      //const path = `test/${new Date().getTime()}_${file.name}`;

      // Totally optional metadata
      // const customMetadata = { app: 'My AngularFire-powered PWA!' };

      // The main task

      this.http.post('http://localhost:8080/images/', file1,  {

    observe: 'events'
  }).subscribe(events => {
    alert('Succesfully uploaded');
    // }
  });

      //this.task = this.storage.upload(path, file);

      // Progress monitoring
      //this.percentage = this.task.percentageChanges();
      //this.snapshot   = this.task.snapshotChanges()

      // The file's download URL
      //this.downloadURL = this.task.downloadURL();
    }

    // Determines if the upload task is active
    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

// this.snapshot = this.task.snapshotChanges().pipe(
//       tap(snap => {
//         if (snap.bytesTransferred === snap.totalBytes) {
//           // Update firestore on completion
//           this.db.collection('photos').add( { path, size: snap.totalBytes });
//         }
//       })
//     );
}
