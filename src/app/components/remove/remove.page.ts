import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Words } from 'src/app/models/data';

const duration = 1500;
@Component({
  selector: 'app-remove',
  templateUrl: './remove.page.html',
  styleUrls: ['./remove.page.scss'],
})
export class RemovePage implements OnInit {
  public words: Words[] = [];
  public disabledButton = false;

  constructor(
    private route: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.words = [
      { englishWord: 'aa', frenchWord: 'aa' },
      { englishWord: 'bbb', frenchWord: 'bbb' },
      { englishWord: 'cccccc', frenchWord: 'cccccc' },
    ];
  }

  onRemove = (index: number) => {
    this.words.splice(index, 1);
    this.presentToast('Element supprimé');
  };

  onAddWord() {
    this.route.navigate(['/add']);
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
