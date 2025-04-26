import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  selectedRole: string = '';
  selectedUser!: User;  

  constructor(private router: Router, private authService: AuthService) {}

  onUserSelected(user: User) {
    this.selectedUser = user;
    this.selectedRole = user.role;
    this.authService.setUser(user);
    console.log('Selected user:', this.selectedUser);
    this.authService.currentUser$.subscribe(user => {
      console.log('Current user from AuthService:', user);
    });
  }

  pageSuivante() {
    if (this.selectedRole === 'ergo') {
      this.router.navigate(['/reglage']);
    } else {
      this.router.navigate(['/acceuil']);
    }
    this.authService.currentUser$.subscribe(user => {
      console.log('Current user from AuthService in pageSuivante:', user);
    });
  }
}
