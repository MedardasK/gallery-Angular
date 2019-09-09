import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GalleryService } from './../../services/gallery.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
    // Main task 
    task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;
  
    snapshot: Observable<any>;
  
    // Download URL
    downloadURL: Observable<string>;
  
    // State for dropzone CSS toggling
    isHovering: boolean;
  
    constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }
  
    
    toggleHover(event: boolean) {
      this.isHovering = event;
    }
  
  
    startUpload(event: FileList) {
      // The File object
      const file = event.item(0)
  
      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') { 
        console.error('unsupported file type :( ')
        return;
      }
  
      // The storage path
      const path = `test/${new Date().getTime()}_${file.name}`;
  
      // Totally optional metadata
      const customMetadata = { app: 'My AngularFire-powered PWA!' };
  
      // The main task
      this.task = this.storage.upload(path, file, { customMetadata })
  
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot   = this.task.snapshotChanges()
  
      // The file's download URL
      this.downloadURL = this.task.downloadURL(); 
    }
  
    // Determines if the upload task is active
    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
    }
}
