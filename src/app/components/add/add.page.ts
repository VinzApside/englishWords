import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      { eng: 'aa', fr: 'aa' },
      { eng: 'bbb', fr: 'bbb' },
      { eng: 'cccccc', fr: 'cccccc' },
    ];
  }

  ngOnInit() {
    this.wordsForm = this.formBuilder.group({
      frenchWord: [null],
      englishWord: [null],
    });
  }

  onAddWords() {
    console.log(this.englishWord, '+++', this.frenchWord);

    const newWord = { eng: 'dddddddd', fr: 'dddddddddd' };
    const engWord = newWord.eng
      .trim()
      .replace(/[&\/\#,+()$~%.'":*?<>{}]/g, '')
      .toLowerCase();
    const existingWord = this.words.find((word) => word.eng === engWord);
    if (!existingWord) {
      this.words.push(newWord);
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
