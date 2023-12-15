import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/class/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact:Contact[] = [
    new Contact("assets/cyrine.jpg","Cyrine Zahar",  "cyrine.zahaar@gmail.com"),
    new Contact("assets/youssef.jpg","Youssef Abid",  "a.y.23.y.a.0@gmail.com")
]
}
