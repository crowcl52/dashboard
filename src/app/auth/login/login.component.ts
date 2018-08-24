import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private auth:AuthService ) { }

  ngOnInit() {
  }

  onSubmit(data){
    this.auth.login(data.email,data.password);
  }

}
