import { RefreshService } from './../../services/refresh.service';
import { Component, Input } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
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
export class PhotoUploadComponent {
  @Input() photo: any;
  categories = [];
  tags = [];
  description = '';
  fileData = new FormData();
  previewUrl: any;
  file = '';
  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private galleryService: GalleryService,
              private refreshService: RefreshService,
              private snackBar: MatSnackBar,
              private router: Router,
              private auth: AuthService,
              private dialog: MatDialog) { }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {
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
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  private submitValues(): void {
    if (this.description === '' || this.categories === []
        || this.tags === [] || !this.fileData.has('file')) {
          return ;
    }
    this.fileData.append('description', this.description);
    this.fileData.append('categories', JSON.stringify(this.categories));
    this.fileData.append('tags', JSON.stringify(this.tags));

    this.galleryService.uploadImage(this.fileData).subscribe(() => {
      this.router.navigate(['/']);
      this.snackBar.open('Successfully uploaded!', '', {
        duration: 3000,
        panelClass: 'snackbar-container'
      });
    },
    () => {
      this.snackBar.open('Error occurred, please try again later!', '', {
        duration: 3000,
        panelClass: 'snackbar-container'
      });
    }
    );
  }

  openDialogCreate(): void {
    if (!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    const dialogRef = this.dialog.open(TagsCategoriesComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.refreshService.callComponentMethod();
    });
  }

}
