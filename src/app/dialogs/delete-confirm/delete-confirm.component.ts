import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryService } from './../../services/gallery.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private galleryService: GalleryService) { }

  decline() {
    this.dialogRef.close();
  }

  accept() {
    console.log(this.data);
    this.galleryService.deleteImage(this.data).subscribe(events => {
      this.snackBar.open('Successfully deleted!', '', {
        duration: 3000
      });
      this.dialogRef.close();
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}
