import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

import { Words } from '../models/data';
import { StorageService } from './storageService';

type DynamicObject = { [key: string]: string };

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  constructor(private storageService: StorageService) {}
  private datas: Words[] = [];

  async downloadCSV() {
    const data = await this.storageService.get();
    const csv = Papa.unparse(data);

    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var csvURL = null;

    csvURL = window.URL.createObjectURL(csvData);

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'englishWords.csv');
    tempLink.click();
  }

  async uploadCSV(event: Event) {
    let file = null;
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      file = target.files[0];
    }

    if (file) {
      const csv = Papa.parse(file, {
        escapeChar: ',',
        delimiter: ',',
        encoding: 'ISO-8859-1',

        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<Words>) => {
          this.datas = results?.data || [];

          if (this.datas.length) {
            this.storageService.removeAll();

            this.datas.forEach(async (data: Words) => {
              console.log(data);

              await this.storageService.add(data);
              console.log('finish');

              // const allData = await this.storageService.get();
              // console.log(allData);
            });
          }
        },
      });
    }
  }
}
