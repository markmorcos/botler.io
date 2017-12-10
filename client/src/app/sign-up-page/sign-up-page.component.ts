import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  @ViewChild('usernameInput') usernameInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;
  usernameError = '';
  passwordError = '';

  constructor() { }

  ngOnInit() {
  }

  onSignUp() {
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;
		axios
  	.post('http://localhost:8000/users/', { username, password })
  	.then(response => alert('Success! You can now login.'))
  	.catch(error => {
      const { username, password } = error.response.data;
      this.usernameError = username ? username.join() : '';
      this.passwordError = password ? password.join() : '';
    });
  }
}
