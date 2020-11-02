import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _FB: FormBuilder,
    private router: Router,
    private authService: AuthService, 
  ) { }

  ngOnInit(): void {
    this.form = this._FB.group({
      email: [''],
      password: [''],
    });

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '792258808230412',
        cookie     : true,
        xfbml      : true,
        version    : 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

  }

  submit(values) {
    console.log(values);
    
    this.authService.login(values);
  }

  submitLogin(){
       // FB.login();
       FB.login((response)=>
       {
         console.log('submitLogin',response);
         if (response.authResponse)
         { 
          this.router.navigate(['list'])
          //  this.authService.loginSocial(response.authResponse.accessToken);
          }
          else
          {
          console.log('User login failed');
          this.router.navigate(['']);
        }
     });
  }

  registration(values){
    this.router.navigate(['profile']);
    this.authService.registration(values)
  }


}
