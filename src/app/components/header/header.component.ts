import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  active: any;
  constructor( public router: Router,
    private authService: AuthService) { }

 
  ngOnInit(): void {
    const searchBox = document.getElementById('search');
    const keyup$ = fromEvent(searchBox, 'keyup');
    keyup$
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(search => {
        this.authService.searchText.next(search)
        // this.requestService.searchText.next({name: search});
      });
  }

  toggleButton(type){
    this.active = type;
    this.router.navigate([type])
  }

  logout(){
    this.authService.logout()
  }

}
