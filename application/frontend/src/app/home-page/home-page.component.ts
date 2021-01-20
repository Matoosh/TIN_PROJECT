import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data:any

  constructor(
    private api: ApiService
    ) {}

  ngOnInit(): void {
    this.api.getBooks().then((response:any) => {
      this.data = response;
    });
  }

}
