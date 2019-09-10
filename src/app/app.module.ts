import { GalleryService } from './services/gallery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent,
         LoginComponent } from './views/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoOneComponent,
         PhotoEditComponent } from './dialogs';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule } from '@angular/material';
import { PhotoUploadComponent,
         PhotoComponent } from './components';
import { FileUploadDirective } from './directives/file-upload.directive';
import { FileSizePipe } from './pipes/file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoOneComponent,
    ItemsCountPipe,
    PhotoUploadComponent,
    PhotoEditComponent,
    LoginComponent,
    FileUploadDirective,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoOneComponent, PhotoComponent, PhotoEditComponent]
})
export class AppModule { }
