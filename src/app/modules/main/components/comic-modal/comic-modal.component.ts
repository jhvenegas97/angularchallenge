import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComicDetailModel } from 'src/app/models/comicDetailModel';

export interface ComicsData {
  selectedComic: number;
  comicData: ComicDetailModel;
  comicFavourite: false;
  comicPrice: string;
  comicPurchaseLink: string;
}

@Component({
  selector: 'app-comic-modal',
  templateUrl: './comic-modal.component.html',
  styleUrls: ['./comic-modal.component.css']
})
export class ComicModalComponent {

  comicAddedToFavourites!: ComicDetailModel[]

  constructor(public dialogRef: MatDialogRef<ComicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComicsData){
      console.log(data)
    }

}
