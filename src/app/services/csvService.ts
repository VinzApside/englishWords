import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

import { StorageService } from './storageService';

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  constructor(private storageService: StorageService) {}

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
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (
          results: Papa.ParseResult<Record<string, unknown>>
        ) {
          const datas = results?.data || [];
          datas.map((data) => {
            console.log(data);
          });
        },
      });
    }
  }
}
