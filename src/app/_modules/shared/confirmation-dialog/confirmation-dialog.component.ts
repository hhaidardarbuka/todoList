import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<ConfirmationDialogComponent>){

  }

  ngOnInit(): void {
    
  }

  confirm():void{
    this._dialogRef.close(true);
  }
}
