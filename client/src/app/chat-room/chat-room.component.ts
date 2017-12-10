import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() token;
	messages = [];
	interval = null;

  constructor() { }

  onReceive() {
		axios.create({
		  baseURL: 'http://localhost:8000',
		  headers: { 'Authorization': 'Token ' + this.token }
		})
  	.get('/messages/')
  	.then(response => this.messages = response.data)
  	.catch(error => console.log(error.response.data));
  }

  ngOnInit() {
  	this.interval = setInterval(this.onReceive.bind(this), 500);
  }

  ngOnDestroy() {
  	if (this.interval != null) {
  		clearInterval(this.interval);
  	}
  }

  onSend(text) {
		axios.create({
		  baseURL: 'http://localhost:8000',
		  headers: { 'Authorization': 'Token ' + this.token }
		})
  	.post('http://localhost:8000/messages/', { text: text.value })
  	.then(response => text.value = '')
  	.catch(error => alert(JSON.stringify(error.response.data)));
  }
}
