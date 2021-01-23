import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbGlobalPhysicalPosition, NbSidebarService, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../api/api.service';
import { BookFormComponent } from '../components/book-form/book-form.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  source: LocalDataSource;
  role:any;
  settings = {};
  data : string[] = [];

  constructor(
    private api: ApiService,
    private nbToastrService: NbToastrService,
    private router: Router,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
    private sidebarService: NbSidebarService,
    private authService: NbAuthService
  ) { 
    this.source = new LocalDataSource();
    this.getData()
    this.getRoleFromToken();
  }


  async getRoleFromToken() {
    let token:any = await this.api.getToken();
    this.role = token.payload.role;
  }

  ngOnInit(): void { 
    if(this.role === 'admin') { 
      this.settings = {
        mode:'external',
        add:{
          confirmCreate:true
        },
        delete:{
          confirmDelete:true,
          // deleteButtonContent: '<img src="../assets/images/trash-2-outline.svg" width="30" height="30" >'
        },
        edit:{
          confirmSave:true,
          // editButtonContent: '<img src="../assets/images/edit-outline.svg" width="30" height="30" >'
        },
        columns: {
          title: {
            title: 'Title',
          }
        },
        actions:{
          position: 'right',
          custom:[
            {
              name:'book-page',
              title:'More details'
            },
          ],
        }
      };
    } else {
      this.settings = {
        mode:'external',
        add:{
          confirmCreate:true
        },
        delete:{
          confirmDelete:true,
          // deleteButtonContent: '<img src="../assets/images/trash-2-outline.svg" width="30" height="30" >'
        },
        edit:{
          confirmSave:true,
          // editButtonContent: '<img src="../assets/images/edit-outline.svg" width="30" height="30" >'
        },
        columns: {
          title: {
            title: 'Title',
          }
        },
        actions:{
          position: 'right',
          custom:[
            {
              name:'book-page',
              title:'More details'
            },
          ],
          edit: false,
          add: false,
          delete: false
        }
      };
    }
  }


  onCreate() {
    this.windowService.open(BookFormComponent, { title: `Add new book`}).onClose.subscribe(()=>{
      this.getData()
    });
  }
  onDelete(event:any) {
    if(window.confirm('Are you sure?')){
      this.api.deleteBook(event.data).then((res:any) =>
      {
        this.showToast("success", res.message, "Success")
        this.source.remove(event.data);
      });
    }
  }

  onEdit(event:any) {
    this.windowService.open(BookFormComponent, { title: `Edit book`, context: event.data }).onClose.subscribe(()=>{
      this.getData()
    });
  }

  onCustom(event:any) {
    if(event.action == "book-page") {
      this.router.navigate(['/book', event.data.id])
    }
  }

  getData(){
    this.api.getBooks().then((data:any) => {
      // console.log(data)
      this.source.load(data);
      this.source.setSort([{
        field:'id',
        direction:'desc'
      }])
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'title',
        search: query
      },
      {
        field: 'description',
        search: query
      }
    ], false);
  }

  showToast(status:any, msg:string, title:string) {
    this.toastrService.show(
      msg,
      title,
      { 
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        status,
        destroyByClick: true,
        preventDuplicates: true,
        duplicatesBehaviour: 'all'  
      }
    );
  }
}
