import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('usernameInput') usernameInputRef: ElementRef;
  @ViewChild('passwordInput') passwordInputRef: ElementRef;
  @Output() tokenEmitter = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
    const username = this.usernameInputRef.nativeElement.value;
    const password = this.passwordInputRef.nativeElement.value;
  	axios
  	.post('http://localhost:8000/get-token/', { username, password })
  	.then(response => this.tokenEmitter.emit(response.data.token))
  	.catch(error => alert(JSON.stringify(error.response.data)));
  }
}
