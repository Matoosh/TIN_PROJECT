import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {

  constructor() { }

  books = [
    { 
      title: 'The Lord of the Rings: The Fellowship of the Ring',
    },
    { 
      title: 'The Lord of the Rings: The Two Towers'
    },
    { 
      title: 'The Lord of the Rings: The Return of the King'
    }
  ]; 

  ngOnInit(): void {
  }

}
