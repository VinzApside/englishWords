import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Words } from 'src/app/models/data';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit {
  public words: Words[] = [];
  constructor(private route: Router) {}

  ngOnInit() {
    this.words = [
      { englishWord: 'aa', frenchWord: 'aa' },
      { englishWord: 'bbb', frenchWord: 'bbb' },
      { englishWord: 'cccccc', frenchWord: 'cccccc' },
    ];
  }

  onRemove = (index: number) => {
    this.words.splice(index, 1);
  };

  onAddWord() {
    this.route.navigate(['/add']);
  }
}
