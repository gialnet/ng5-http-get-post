import { Component, NgModule  } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

interface UserProfile {
  id: number;
  content: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';
  name:string = '';
  age:number;
  id: number;
  found:boolean;
  
  constructor(private httpCliente: HttpClient){
    
  }

  CuandoKeyUp(event: any){
    this.name = event.target.value;
    this.found = false;
  }

  getProfile(){
    this.httpCliente.get<UserProfile>('http://localhost:8080/profile')
    .subscribe(
      (data) => {
        //if(data.length) {
          console.log(data.age);
          console.log(data.content);
          this.age = data.age;
          this.name=data.content;
          this.id=data.id;
          //this.found = true;
        //}
      }
    )
  }

  postProfile() {

    let headers = new HttpHeaders().set('Content-Type','application/json;charset=UTF8');
     console.log('Paso por el post');
    
    this.httpCliente.post('http://localhost:8080/profile', {"id": 1, "content": "YoEnOtroMomento", "age": 41}).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );


  }
}
