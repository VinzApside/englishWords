import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Words } from 'src/app/models/data';
import { StorageService } from 'src/app/services/storageService';

const duration = 1500;
@Component({
  selector: 'app-guessWord',
  templateUrl: './guessWord.page.html',
  styleUrls: ['./guessWord.page.scss'],
})
export class GuessWordPage implements OnInit, AfterContentChecked {
  public guessWord!: Partial<Words>;
  private answer = '';
  public words: Words[] = [];
  public reloadWords = false;
  public wordsNumber = 0;
  public guessFrench!: boolean;
  public zeroWord = 0;

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,
    private route: Router
  ) {}

  async ngOnInit() {
    await this.initWords();
  }

  public async initWords() {
    this.words = await this.storageService.get();
    this.zeroWord = this.wordsNumber = this.words.length;
    this.getNewWordToGuess();
  }

  getNewWordToGuess() {
    if (this.wordsNumber > 0) {
      let randomNumber = this.randomNumber(this.words.length);

      const { englishWord, frenchWord } = this.words[randomNumber - 1];
      this.guessFrench = !(this.randomNumber(2) - 1);

      if (randomNumber === 1) {
        this.guessWord = { englishWord };
        this.answer = frenchWord;
      } else {
        this.guessWord = { frenchWord };
        this.answer = englishWord;
      }
    }
  }

  async ngAfterContentChecked() {
    if (this.reloadWords) {
      this.reloadWords = false;
      await this.initWords();
    }
  }

  onAddWord() {
    this.reloadWords = true;
    this.route.navigateByUrl('/add');
  }

  randomNumber(max: number) {
    return Math.floor(Math.random() * max + 1);
  }

  checkAnswer() {
    if (this.guessFrench) {
      this.words = this.words.filter((word) => word.frenchWord === this.answer);
    } else {
      this.words = this.words.filter(
        (word) => word.englishWord === this.answer
      );
    }
    this.zeroWord -= 1;
    this.presentToast('Clap');
    this.getNewWordToGuess();
  }

  async presentToast(toasterMessage: string, toasterColor = 'success') {
    const toast = await this.toastController.create({
      message: toasterMessage,
      duration: duration,
      position: 'middle',
      color: toasterColor,
      buttons: [
        {
          text: 'OK',
          role: 'alert',
          handler: () => {
            console.log('coucou');
          },
        },
      ],
    });

    await toast.present();
  }
}
