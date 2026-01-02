import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNingaDto } from './dto/create-ninga.dto';
import { UpdateNingaDto } from './dto/update-ninga.dto';

type ninga = CreateNingaDto;

@Injectable()
export class NingasService {
  private ningas: ninga[] = [
    { id: 1, name: 'ningaA', weapon: 'stars' },
    { id: 2, name: 'ningaB', weapon: 'hands' },
  ];

  getNingas(id?: number) {
    if (typeof id === 'number') {
      const found = this.ningas.find((x) => x.id === id);
      if (!found) throw new NotFoundException(`Ninga with id ${id} not found`);
      return found;
    }
 
    return this.ningas;
  }

  createNinga(payload: CreateNingaDto) {
    const nextId =
      this.ningas.length > 0
        ? Math.max(...this.ningas.map((n) => n.id)) + 1
        : 1;
    const newNinga: ninga = { ...payload, id: nextId };
    this.ningas.push(newNinga);
    return newNinga;
  }

  getNingaById(id: number) {
    return this.ningas.find((n) => n.id === id);
  }

  updateNinga(id: number, payload: UpdateNingaDto) {
    const idx = this.ningas.findIndex((n) => n.id === id);
    if (idx === -1) return undefined;
    this.ningas[idx] = { ...this.ningas[idx], ...payload, id };
    return this.ningas[idx];
  }

  removeNinga(id: number) {
    const idx = this.ningas.findIndex((n) => n.id === id);
    if (idx === -1) return false;
    this.ningas.splice(idx, 1);
    return true;
  }
}
