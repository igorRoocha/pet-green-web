import { Component, OnInit, Inject, Input } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  public files: File[] = [];
  @Input('files') inputFiles: string;
  public description = 'Arraste o arquivo aqui ou clique para fazer upload';

  constructor(@Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
    if (this.inputFiles && this.inputFiles.length > 0) {
      this.writeFile(this.inputFiles, 'image.jpg').then(file => this.files.push(file));
    }
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);

    if (this.files.length > 1) {
      const alertMsg = 'É permitido adicionar apenas uma imagem para o logo da empresa';

      this.onRemove(event);
      this.utilService.showNotification('fas fa-exclamation-triangle', alertMsg, 'warning');
      return;
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  public async writeFile(dataURI: any, fileName: string): Promise<File> {
    const arr = dataURI.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type: mime});
  }
}
