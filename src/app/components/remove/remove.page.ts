import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit {
  public words: { eng: string; fr: string }[] = [];
  constructor() {}

  ngOnInit() {
    this.words = [
      { eng: 'aa', fr: 'aa' },
      { eng: 'bbb', fr: 'bbb' },
      { eng: 'cccccc', fr: 'cccccc' },
    ];
  }
}
