import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReceiptPDFService } from "../services/pdf-receipt.service";


@Component({
   selector: 'pdf-preview',
   templateUrl: './dialog-pdf-preview.component.html',
   styleUrls: ['./dialog-pdf-preview.component.scss']
})

export class DialogPDFViewerComponent implements OnInit{
    
    constructor(public receiptPDFService: ReceiptPDFService, public dialogRef: MatDialogRef<DialogPDFViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
        
    }

    ngOnInit() {

        this.receiptPDFService.generatePDF();
    }

    print(){
        this.receiptPDFService.save();
    }

    ngOnDestroy(){
        this.receiptPDFService.reset();
    }



}