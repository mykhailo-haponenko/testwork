import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any;
  userId: any;
  searchText: any;
  constructor(private authService: AuthService,
    private router: Router) {
    this.authService.getUsers();
    this.authService.getСurrentUser();
  }

  ngOnInit(): void {
    this.authService.searchText.subscribe(res => {
      this.searchText = res;
    })
    this.authService.users.subscribe(res => {
      this.users = res;
    })
    this.authService.currentUser.subscribe(user => {
      this.userId = user.id;
    })
  }

  openProfile(id){    
    this.router.navigate(['profile'])
    this.authService.getUserById(id);
  }

}
