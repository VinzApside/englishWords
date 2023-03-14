import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storageService';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public frenchWord!: string;
  public englishWord!: string;

  wordsForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private useStorage: StorageService
  ) {}

  async loadData() {
    const res = await this.useStorage.get('words');
    return res;
  }

  async ngOnInit() {
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

  async onAddWords() {
    const newWord = this.wordsForm.value;

    const { message, type } = await this.useStorage.add(newWord);

    this.presentToast(message, type);
    this.wordsForm.reset();
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
