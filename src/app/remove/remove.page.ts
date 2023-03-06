import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit {
  public words: string[] = [];
  constructor() {}

  ngOnInit() {
    this.words = ['aaa', 'bbbb', 'ccccc'];
  }
}
