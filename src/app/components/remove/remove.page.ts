import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Words } from 'src/app/models/data';
import { StorageService } from 'src/app/services/storageService';

const duration = 1500;
let number = 0;
@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit, AfterContentChecked {
  public words: Words[] = [];
  public disabledButton = false;
  public reloadWords = false;
  jsonData$!: Observable<unknown>;

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
}
