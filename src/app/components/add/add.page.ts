import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Words } from 'src/app/models/data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private words: Words[] = [];
  public frenchWord!: string;
  public englishWord!: string;

  wordsForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.words = [
      { englishWord: 'aa', frenchWord: 'aa' },
      { englishWord: 'bbb', frenchWord: 'bbb' },
      { englishWord: 'cccccc', frenchWord: 'cccccc' },
    ];
  }

  ngOnInit() {
    const regexForWords = /^[a-zA-Z\s\-]*$/;
    this.wordsForm = this.formBuilder.group({
      frenchWord: [
        null,
        [Validators.required, Validators.pattern(regexForWords)],
      ],
      englishWord: [
        null,
        [Validators.required, Validators.pattern(regexForWords)],
      ],
    });
  }

  onAddWords() {
    const newWord = this.wordsForm.value;
    const engWord = newWord.englishWord
      .trim()
      .replace(/[&\/\#,+()$~%.'":*?<>{}]/g, '')
      .toLowerCase();
    const existingWord = this.words.find(
      (word) => word.englishWord === engWord
    );
    if (!existingWord) {
      this.words.push(newWord);
      this.wordsForm.reset();
      this.presentToast('Ce mot a été ajouté');
    } else {
      this.presentToast('Ce mot existe déja', 'danger');
    }
  }

  async presentToast(toasterMessage: string, toasterColor = 'success') {
    const toast = await this.toastController.create({
      message: toasterMessage,
      duration: 2000,
      position: 'middle',
      color: toasterColor,
      buttons: [
        {
          text: 'OK',
          role: 'alert',
        },
      ],
    });

    await toast.present();
  }
}
