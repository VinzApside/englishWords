import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Words } from '../models/data';

interface AddResponse {
  message: string;
  type?: string;
}

const STORAGE_KEY = 'my_words';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    if (this._storage === null) {
      this._storage = await this.storage.create();
    }
  }

  public async get(): Promise<Words[]> {
    return (await this._storage?.get(STORAGE_KEY)) || [];
  }
  public async add(item: Words): Promise<AddResponse> {
    const storedData = (await this._storage?.get(STORAGE_KEY)) || [];
    const { englishWord } = item;
    const isExist = this.isExistingWord(storedData, englishWord);
    if (!isExist) {
      storedData.push(item);
      await this._storage?.set(STORAGE_KEY, storedData);
      return { message: 'Ce mot a été ajouté' };
    } else {
      return { message: 'Ce mot existe déja', type: 'danger' };
    }
  }

  public async remove(word: Words) {
    const { englishWord } = word;
    let storedData = (await this._storage?.get(STORAGE_KEY)) || [];
    const isExist = this.isExistingWord(storedData, englishWord);
    if (isExist) {
      storedData = storedData.filter(
        (data: Words) => data.englishWord !== englishWord
      );
      await this._storage?.set(STORAGE_KEY, storedData);
      return { message: 'Ce mot a été supprimé' };
    } else {
      return { message: "Ce mot n'existe pas", type: 'danger' };
    }
  }

  public async removeAll() {
    await this._storage?.clear();
  }

  private isExistingWord(storeData: Words[], englishWord: string) {
    const engWord = englishWord
      .trim()
      .replace(/[&\/\#,+()$~%.'":*?<>{}]/g, '')
      .toLowerCase();

    return storeData.find((word) => word?.englishWord === engWord);
  }
}
