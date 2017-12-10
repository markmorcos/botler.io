import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() { }
  
  onToken(token) {
  	localStorage.setItem('token', token);
  }

  getToken() {
  	return localStorage.getItem('token');
  }

  isLoggedIn() {
  	return this.getToken() != null;
  }

  onLogout() {
  	localStorage.removeItem('token');
  }
}
