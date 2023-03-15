import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { Words } from 'src/app/models/data';
import { StorageService } from 'src/app/services/storageService';

const duration = 1000;

@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit, AfterContentChecked {
  public words: Words[] = [];
  public disabledButton = false;
  public reloadWords = false;
  public inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  constructor(
    private route: Router,
    private toastController: ToastController,
    private storageService: StorageService
  ) {
    this.storageService.get();
  }

  async ngOnInit() {
    this.words = await this.storageService.get();
  }

  async ngAfterContentChecked() {
    if (this.reloadWords) {
      this.reloadWords = false;
      this.words = await this.storageService.get();
    }
  }

  onRemove = async (index: number, word: Words) => {
    const { message, type } = await this.storageService.remove(word);
    if (type !== 'danger') {
      this.words.splice(index, 1);
    }
    this.presentToast(message, type);
  };

  onAddWord() {
    this.reloadWords = true;
    this.route.navigateByUrl('/add');
  }

  async presentToast(toasterMessage: string, toasterColor = 'success') {
    this.disabledButton = true;
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
            this.disabledButton = false;
          },
        },
      ],
    });

    await toast.present();

    const dismiss = await toast.onDidDismiss();
    this.disabledButton = this.disabledButton && dismiss.role !== 'timeout';
  }

  async onInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const value = target?.value || null;
    if (!value) {
      this.words = await this.storageService.get();
      return;
    }
    const filteredValue = value.replace(/[^a-zA-Z ]+/g, '');
    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;

    const waitForIt = setTimeout(async () => {
      const words = await this.storageService.get();

      this.words = words.filter(
        (word) =>
          word.englishWord.includes(filteredValue) ||
          word.frenchWord.includes(filteredValue)
      );
    }, 1000);
    return () => clearTimeout(waitForIt);
  }
}
