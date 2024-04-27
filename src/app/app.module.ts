import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReceiptPDFService } from './services/pdf-receipt.service';
import { DialogPDFViewerComponent } from './components/dialog-pdf-preview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DialogPDFViewerComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    PdfViewerModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [ReceiptPDFService],
  bootstrap: [AppComponent]
})

export class AppModule { }
