import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../api/api.service';
import { AuthorFormComponent } from '../components/author-form/author-form.component';

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.scss']
})
export class AuthorsPageComponent implements OnInit {
  source: LocalDataSource;
  role:any;
  settings = {};
  
  data : string[] = [];
  constructor(
    private api: ApiService,
    private toastrService: NbToastrService,
    private router: Router,
    private windowService: NbWindowService
  ) {
    this.source = new LocalDataSource();
    this.getRoleFromToken();
    this.getData()
  }

  ngOnInit(): void {
    if(this.role === 'admin') {
      this.settings = {
        mode:'external',
        add:{
          confirmCreate:true
        },
        delete:{
          confirmDelete:true
        },
        edit:{
          confirmSave:true
        },
        columns: {
          first_name: {
            title: 'First name'
          },
          last_name: {
            title: 'Last name'
          },
          birth:{
            title: 'Birthday'
          }
        },
        actions:{
          position: 'right',
          custom:[
            {
              name:'author-page',
              title:'More details'
            }
          ]
        }
      }
    } else {
      this.settings = {
        mode:'external',
        add:{
          confirmCreate:true
        },
        delete:{
          confirmDelete:true
        },
        edit:{
          confirmSave:true
        },
        columns: {
          first_name: {
            title: 'First name'
          },
          last_name: {
            title: 'Last name'
          },
          birth:{
            title: 'Birthday'
          }
        },
        actions:{
          position: 'right',
          custom:[
            {
              name:'author-page',
              title:'More details'
            }
          ],
          edit: false,
          add: false,
          delete: false
        }
      }
    }
  }

  
  async getRoleFromToken() {
    let token:any = await this.api.getToken();
    this.role = token.payload.role;
  }

  onCreate() {
    this.windowService.open(AuthorFormComponent, { title: `Add new author`}).onClose.subscribe(()=>{
      this.getData()
    });
  }

  onDelete(event:any) {
    if(window.confirm('Are you sure?')){
      this.api.deleteAuthor(event.data).then((res:any) =>
      {
        this.showToast(res.status, res.message, res.status);
        this.source.remove(event.data);
      });
    }
  }

  onEdit(event:any) {
    console.log(event);
    this.windowService.open(AuthorFormComponent, { title: `Edit author`, context: event.data }).onClose.subscribe(()=>{
      this.getData()
    });
  }

  onCustom(event:any) {
    if(event.action == "author-page") {
      this.router.navigate(['/author', event.data.id])
    }
  }

  getData(){
    this.api.getAuthors().then((data:any) => {
      this.source.load(data);
      this.source.setSort([{field:'id',direction:'desc'}])
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'first_name',
        search: query
      },
      {
        field: 'last_name',
        search: query
      },
      {
        field: 'birth',
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
