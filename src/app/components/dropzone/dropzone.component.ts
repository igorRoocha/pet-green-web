import { Component, OnInit, Inject } from '@angular/core';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  public files: File[] = [];
  public description = 'Arraste o arquivo aqui ou clique para fazer upload';

  constructor(@Inject(UtilService) private utilService: UtilService) { }

  ngOnInit() {
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
}
