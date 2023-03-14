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

  public async get(key: string): Promise<Words[]> {
    return (await this._storage?.get(STORAGE_KEY)) || [];
  }
  public async add(item: Words): Promise<AddResponse> {
    const storeData = (await this._storage?.get(STORAGE_KEY)) || [];
    const isExist = this.isExistingWord(storeData, item);
    if (!isExist) {
      storeData.push(item);
      await this._storage?.set(STORAGE_KEY, storeData);
      return { message: 'Ce mot a été ajouté' };
    } else {
      return { message: 'Ce mot existe déja', type: 'danger' };
    }
  }

  public async remove(key: string) {
    let storedData = (await this._storage?.get(STORAGE_KEY)) || [];
    storedData = storedData.filter((data: string) => data !== key);
    return this._storage?.set(STORAGE_KEY, storedData);
  }

  private isExistingWord(storeData: Words[], newItem: Words) {
    const engWord = newItem.englishWord
      .trim()
      .replace(/[&\/\#,+()$~%.'":*?<>{}]/g, '')
      .toLowerCase();

    return storeData.find((word) => word.englishWord === engWord);
  }
}
