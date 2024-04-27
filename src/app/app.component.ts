import { Component } from '@angular/core';
import { ReceiptPDFService } from './services/pdf-receipt.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPDFViewerComponent } from './components/dialog-pdf-preview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FLISOL-jsPDF';

  constructor(private dialog: MatDialog){
    
  }

  openDialog(){
    let dialogref = this.dialog.open(DialogPDFViewerComponent,{
      width: '600px',
      height: '800px',
    });
   dialogref.backdropClick().subscribe(() => {
      // Close the dialog when clicked outside
      dialogref.close();
  });
    
  }
}
