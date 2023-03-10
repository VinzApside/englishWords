import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Words } from './models/data';
import { StorageService } from './services/storageService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public words: Words[] = [];

  public appPages = [
    { title: 'Guess word', url: '/guessWord', icon: 'help' },
    { title: 'Add', url: '/add', icon: 'create' },
    { title: 'Remove', url: '/remove', icon: 'trash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.get();
  }
}
