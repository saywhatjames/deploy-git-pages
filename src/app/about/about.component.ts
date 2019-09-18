import {Component, OnInit} from '@angular/core';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
   album: any[] = [];
   thumbnails = [];


  constructor(private lightbox: Lightbox) {
  }

  populateThumbnails() {
    for (let i = 1; i <= 9; i++) {
      const src = '../../assets/basement-renovations-4-min.jpg';
      const thumbnail = {
        imageUrl: src
      };
      this.thumbnails.push(thumbnail);
    }
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.album, 0);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  populateLightBox() {
    for (let i = 1; i <= 4; i++) {
      const imageUrl = '../../assets/pic' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = '../../assets/basement-renovations-4-min.jpg';
      const album = {
        src: imageUrl,
        cap: caption,
        thumbnail: thumb
      };

      this.album.push(album);
    }
  }

  ngOnInit() {
    this.populateThumbnails();
    this.populateLightBox();
  }

}
