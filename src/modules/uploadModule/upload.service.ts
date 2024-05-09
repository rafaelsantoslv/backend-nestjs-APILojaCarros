import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  async uploadImage(image: Express.Multer.File): Promise<string> {
    try {
      const UPLOAD_DIR = path.resolve('./', 'src', 'uploads'); // Diretório de uploads
      const dataAtual = this.obterDataHoraAtual(); // Função para obter data e hora atual

      // Verifica se o diretório de uploads existe, se não, cria o diretório
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      // Gera um nome de arquivo único baseado na data e hora atual e no nome original do arquivo
      const fileName = `${dataAtual}-${image.originalname}`;
      const filePath = path.resolve(UPLOAD_DIR, fileName);

      // Salva o arquivo no diretório de uploads
      await fs.promises.writeFile(filePath, image.buffer);

      // Retorna o nome do arquivo para ser armazenado no banco de dados
      return fileName;
    } catch (error) {
      throw new BadRequestException('Falha ao fazer upload de imagem', error.message);
    }
  }

  private obterDataHoraAtual(): string {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são indexados de 0 a 11
    const ano = dataAtual.getFullYear();
    const hora = String(dataAtual.getHours()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const segundo = String(dataAtual.getSeconds()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário

    return `${ano}-${mes}-${dia}-${hora}-${minuto}-${segundo}`;
  }
}
