import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private API_URL = environment.ApiUrl;
  token;

  currentUser: BehaviorSubject<any> = new BehaviorSubject({});
  users: BehaviorSubject<any> = new BehaviorSubject([]);
  searchText: BehaviorSubject<any> = new BehaviorSubject('')

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
  }

  async getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`)
  }

  async getHeadersImg() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Content-Type', 'multipart/form-data').set('Authorization', `Bearer ${token}`)
  }


  getСurrentUser() {
    this.getHeaders().then(headers => {
      this.http.get(this.API_URL + `/user/current`, { headers })
        .subscribe((resp: any) => {
          this.currentUser.next(resp.result)
        })
    });
  }

  getUsers() {
    this.getHeaders().then(headers => {
      this.http.get(this.API_URL + `/user`, { headers })
        .subscribe((resp: any) => {
          this.users.next(resp.result)
        })
    });
  }

  getUserById(id) {
    this.getHeaders().then(headers => {
      this.http.get(this.API_URL + `/user/${id}`, { headers })
        .subscribe((resp: any) => {
          this.currentUser.next(resp.result)
        })
    });
  }

  editUser(body) {
    this.getHeaders().then(headers => {
      this.http.put(this.API_URL + `/user/profile`, body, { headers })
        .subscribe((resp: any) => {
          if (resp.status === 'success') {
            this._snackBar.open('Edit success', 'Close', {
              duration: 3000
            });
            this.getUsers();
          } else {
            this._snackBar.open('Edit error', 'Close', {
              duration: 3000
            });
          }
        })
    });
  }

  login(params) {
    this.http.post(this.API_URL + '/user/login', params)
      .subscribe((resp: any) => {
        this.router.navigate(['list']);
        localStorage.setItem('token', resp.result.token);
      })
  }

  registration(params) {
    this.http.post(this.API_URL + '/user/register', params)
      .subscribe((resp: any) => {
        this.router.navigate(['edit-profile']);
        localStorage.setItem('token', resp.result.token);
      })
  }

  editImage(image) {
    this.getHeadersImg().then(headers => {
      this.http.post(this.API_URL + '/user/profile/image', image, { headers })
        .subscribe((resp: any) => {
          console.log(resp);
        })
    })
  }

  editCoordinates(cord){
    this.getHeaders().then(headers => {
      this.http.put(this.API_URL + `/user/location`, cord, { headers })
        .subscribe((resp: any) => {
         this.getUsers();
        })
    });
  }

  loginSocial(token) {
    this.http.post(this.API_URL + '/user/login/facebook', { "token": token })
      .subscribe((resp: any) => {
        this.router.navigate(['list']);
        localStorage.setItem('token', resp.token);
      })
  }

  logout() {
    this.getHeaders().then(headers => {
      this.http.post(this.API_URL + `/user/logout`, { headers })
    });
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  public getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return;
    }
  }

  // @ TODO
  // isTokenExpired() {}

  // @TODO
  public canActivate(): boolean {
    if (!this.getToken()) {
      this.router.navigate(['/login'])
      return false;
    } else {
      return true;
    }
  }
}