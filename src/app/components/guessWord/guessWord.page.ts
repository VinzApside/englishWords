import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guessWord',
  templateUrl: './guessWord.page.html',
  styleUrls: ['./guessWord.page.scss'],
})
export class GuessWordPage implements OnInit {
  public guessWord!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

  }
}
