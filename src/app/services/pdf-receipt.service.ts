import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Product, Receipt, Store } from '../models/receipt.models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class ReceiptPDFService {

    private receipt: jsPDF;
    private receiptDimensions = [65, 155];
    pdfSrc: string[] = [];
    loadedPDF: boolean = false;
    private fileName: string = "reipt-example.pdf";
    public jsonURL = 'assets/test-data/receipt-data.json';
    private greeteingsMessage: string = "Gracias por su visita!\n Vuelva pronto.";
    private receiptData!: Receipt;

    constructor(private http: HttpClient) {
      this.receipt = new jsPDF('p', 'mm', this.receiptDimensions);
        console.log(this.receipt.getFontList());
    } 

    public generatePDF(){
        this.getJSONData().subscribe((data: Receipt) => {
            this.receiptData = data;
            
            this.addHeader();
            this.addSaleDetails();
            this.addTottals();
            this.addFooter();

            this.pdfSrc[0] = this.receipt.output("dataurlstring",{filename: "lopi.pdf"});
            this.loadedPDF = true;
        })
        
    }

    public save(){
        this.receipt.save(this.fileName);
    }

    public reset(){
        this.receipt = new jsPDF('p', 'mm', this.receiptDimensions);
    }

    private addHeader(){
        let storeDetails: Store = this.receiptData?.storeDetails;

        this.receipt.setFont("helvetica","bold");
        this.receipt.setFontSize(12);
        this.receipt.text(storeDetails.name,this.receiptDimensions[0]/2,10,{align: 'center'});
        this.receipt.setFontSize(8);
        this.receipt.setTextColor('#001d3d')
        this.receipt.text(storeDetails.location,this.receiptDimensions[0]/2,14,{align: 'center'});
        this.receipt.text(storeDetails.phone,this.receiptDimensions[0]/2,18,{align: 'center'});
    }

    private addSaleDetails(){
        let details: Product[] = this.receiptData.items;
        const maxLenLine = 30;
        let extraLines = 0;
        let yshift = 0;

        this.receipt.setFillColor('#edede9');
        this.receipt.roundedRect(5,30,55,4,0,0,'F');
        this.receipt.setTextColor(0,0,0)
        this.receipt.setFont("helvetica","normal");
        this.receipt.setFontSize(7.8);
        this.receipt.text("Productos",6,33,{align:'left'});
        this.receipt.text("Precios",58,33,{align:'right'});

        this.receipt.setFont('courier','normal');
        this.receipt.setFontSize(7);
        details.forEach((product: Product,index) => {
            if(product){
                yshift = (index+extraLines) * 3;
                this.receipt.text(product.name,6,36 + yshift,{align:'left',maxWidth:maxLenLine});
                this.receipt.text(product.currency.symbol+product.price.toString(),50,36+yshift,{align:'left'});
                extraLines += this.receipt.splitTextToSize(product?.name,maxLenLine).length - 1;
            }
        });


    }

    private addTottals(){
        let total = this.receiptData.total;
        this.receipt.setLineWidth(0.4);
        this.receipt.setDrawColor('#343a40');
        this.receipt.line(5,120,60,120);

        this.receipt.setFont('courier','bold');
        this.receipt.setFontSize(9)
        this.receipt.setTextColor(0,0,0);
        this.receipt.text("CUP: ",35,124);
        this.receipt.text("USD: ",35,127);
        this.receipt.text("EUR: ",35,130);

        this.receipt.setFont('courier','normal');
        this.receipt.text(total.toFixed(2),48,124,{align: 'left'});
        this.receipt.text((total/350).toFixed(2),48,127,{align: 'left'});
        this.receipt.text((total/390).toFixed(2),48,130,{align: 'left'});

        this.receipt.line(5,133,60,133);
    }

    private addFooter(){
        
        this.receipt.setTextColor('#343a40');
        this.receipt.setFont("helvetica","normal");
        this.receipt.setFontSize(8);
        this.receipt.text(`Le ha atendido ${this.receiptData.cashier.name} :)`,this.receiptDimensions[0]/2,140,{align:'center'});
        
        this.receipt.setFont("helvetica","normal");
        this.receipt.text(this.greeteingsMessage,this.receiptDimensions[0]/2,150,{align: 'center'})
    }

    private getJSONData(): Observable<Receipt> {
        return this.http.get(this.jsonURL).pipe(
          map((response: any) => {
            return new Receipt(response);
          })
        );
    }

}