import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

import { Datas, Words } from './models/data';

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
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http
      .get<Datas>('assets/data/words.json')
      .pipe(map((res: Datas) => res.words))
      .subscribe(
        (res: Words[]) => {
          this.words = res;
        },
        (err) => {
          alert('failed loading json data');
        }
      );
  }
}
