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

  constructor() { }

  ngOnInit() {
  }

  onSignUp() {
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;
		axios.create({
		  baseURL: 'http://localhost:8000',
		  headers: { 'Authorization': 'Token 3116ca2857225307f7012a3a07baea0e3f869f3d' }
		})
  	.post('http://localhost:8000/users/', { username, password, messages: [] })
  	.then(response => alert('Success! You can now login.'))
  	.catch(error => alert(JSON.stringify(error.response.data)));
  }
}
