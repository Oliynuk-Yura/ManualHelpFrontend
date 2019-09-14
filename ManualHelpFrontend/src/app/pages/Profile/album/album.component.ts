import { Component, OnInit } from '@angular/core';
import {Images} from "../../../core/models/user.model"
import {ImagesService} from "../../../services/user/images.service"


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public images: Images[] = [];
  page: number = 1;  

  constructor(private imageservice: ImagesService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages(){
    this.imageservice.loadImages(this.page)
    .subscribe(data => 
      {
        let imageItems = data.data;
        if(imageItems != undefined){
          imageItems.forEach(item =>{
            this.images.push(item);
          })
        }        
      });
  }

  onScroll(){
    console.log('scrolled!!');
    this.getImages();
    this.page = this.page+1;
  }
}
