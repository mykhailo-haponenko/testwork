import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import countriesJson from '../../../assets/countries/countries.json';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public form: FormGroup;
  avatarUrl: any;
  countries = Object.values(countriesJson);
  constructor(
    private _FB: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public http: HttpClient,
  ) {     
    this.authService.getСurrentUser();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(res => {  
      this.avatarUrl = res.image
      this.form = this._FB.group({
        firstName: res.firstName || '',
        lastName: res.lastName || '',
        gender: res.gender || '',
        country: res.country || '',
        city: res.city || ''
      });
    }) 

  }

  submit(values) {
    this.authService.editUser(values);
    this.router.navigate(['list'])
    // this.authService.editImage(this.avatarUrl)
    // this.authService.login(values);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.avatarUrl = event.target.result;
      }
    }
  }
}
