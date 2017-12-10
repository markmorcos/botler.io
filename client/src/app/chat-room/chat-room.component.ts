import { Component, OnInit, OnDestroy, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() token;
  @Output() logoutEmitter = new EventEmitter<void>();
  textError = '';

  messages = [];
  interval = null;

  constructor() { }

  onReceive() {
    axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.token }
    })
    .get('/messages/')
    .then(response => this.messages = response.data.reverse())
    .catch(error => this.onLogout());
  }

  ngOnInit() {
    this.interval = setInterval(this.onReceive.bind(this), 500);
  }

  ngOnDestroy() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
  }

  onLogout() {
    this.logoutEmitter.emit();
  }

  onSend(text) {
    axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.token }
    })
    .post('http://localhost:8000/messages/', { text: text.value })
    .then(response => text.value = this.textError = '')
    .catch(error => {
      const { text } = error.response.data;
      this.textError = text ? text.join() : '';
      if (!text) this.onLogout();
    });
  }
}
