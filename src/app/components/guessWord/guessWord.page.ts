import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { Words } from 'src/app/models/data';
import { StorageService } from 'src/app/services/storageService';

const duration = 1000;
@Component({
  selector: 'app-guessWord',
  templateUrl: './guessWord.page.html',
  styleUrls: ['./guessWord.page.scss'],
})
export class GuessWordPage implements OnInit, AfterContentChecked {
  @ViewChild('ionInputEng', { static: true }) ionInputEng!: IonInput;
  @ViewChild('ionInputFr', { static: true }) ionInputFr!: IonInput;
  GuessForm!: FormGroup;
  engCtrl!: FormControl;
  frCtrl!: FormControl;

  private correctAnswer = '';
  public answer: string | null = null;
  public words: Words[] = [];
  public reloadWords = false;
  public guessFrench!: boolean;
  public remainingWords = 0;
  public inputModelEng: string = '';
  public inputModelFr: string = '';
  public isZeroWord = false;

  constructor(
    public formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastController: ToastController,
    private route: Router
  ) {}

  async ngOnInit() {
    this.initFormControls();
    await this.initWords();
  }

  private initFormControls() {
    this.engCtrl = this.formBuilder.control('');
    this.frCtrl = this.formBuilder.control('');
    this.GuessForm = this.formBuilder.group({
      eng: this.engCtrl,
      fr: this.frCtrl,
    });
  }

  public async initWords() {
    this.words = await this.storageService.get();

    this.remainingWords = this.words.length;
    this.isZeroWord = this.words.length === 0;
    this.getNewWordToGuess();
  }

  getNewWordToGuess() {
    if (this.remainingWords > 0) {
      let randomNumber = this.randomNumber(this.words.length - 1);

      const { englishWord, frenchWord } = this.words[randomNumber];

      this.guessFrench = Math.random() < 0.5;

      this.inputModelEng = this.guessFrench ? englishWord : '';
      this.inputModelFr = this.guessFrench ? '' : frenchWord;
      this.correctAnswer = this.guessFrench ? frenchWord : englishWord;

      this.defineNewCtrl(englishWord, frenchWord);
    }
  }

  private defineNewCtrl(englishWord: string, frenchWord: string) {
    this.GuessForm.clearValidators();
    this.GuessForm.patchValue({
      eng: this.inputModelEng,
      fr: this.inputModelFr,
    });

    this.guessFrench ? this.engCtrl.disable() : this.frCtrl.disable();
    this.guessFrench ? this.frCtrl.enable() : this.engCtrl.enable();

    this.engCtrl.addValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(englishWord.length + 10),
    ]);
    this.frCtrl.addValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(frenchWord.length + 10),
    ]);
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
    return Math.floor(Math.random() * (max + 1));
  }

  checkAnswer() {
    this.answer = this.guessFrench ? this.frCtrl.value : this.engCtrl.value;

    if (this.correctAnswer !== this.answer) {
      this.presentToast('Nope', 'danger');
      this.GuessForm.reset();
      this.getNewWordToGuess();

      return;
    }

    this.words = this.words.filter(
      (word) =>
        word.frenchWord !== this.correctAnswer ||
        word.englishWord !== this.correctAnswer
    );

    this.remainingWords -= 1;
    this.presentToast('Clap');
    this.getNewWordToGuess();
  }

  async presentToast(toasterMessage: string, toasterColor = 'success') {
    const toast = await this.toastController.create({
      message: toasterMessage,
      duration: duration,
      position: 'top',
      color: toasterColor,
    });

    await toast.present();
  }

  onInput(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.checkAnswer();
    }
  }
}
