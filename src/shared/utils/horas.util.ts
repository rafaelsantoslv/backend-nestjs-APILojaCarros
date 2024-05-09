// src/meu-modulo/utils/horas.util.ts

export function obterDataHoraAtual(): string {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são indexados de 0 a 11
    const ano = dataAtual.getFullYear();
    const hora = String(dataAtual.getHours()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    const segundo = String(dataAtual.getSeconds()).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
    
    return `${dia}${mes}${ano}_${hora}${minuto}${segundo}`;
}
