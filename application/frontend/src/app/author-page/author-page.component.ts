import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit {
  id:any;
  author:any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getAuthor(this.id).then((response:any) => {
      this.author = response;
    });
  }

}
