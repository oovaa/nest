import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { Subject } from 'rxjs';

@Injectable()
export class CarsqService {
  constructor(@Inject('CARS_SERVER') private readonly client: ClientProxy) {}

  private sseSubject = new Subject<MessageEvent>();

  emitToSse(data: any) {
    this.sseSubject.next({ data: JSON.stringify(data) } as MessageEvent);
  }

  @Interval(1000)
  sendHeartbeat() {
    const payload = {
      timestamp: new Date().toISOString(),
      message: 'Automatic heartbeat message',
      id: Math.floor(Math.random() * 1000),
    };

    console.log('🚔, Sending CAR to RabbitMQ...');

    this.send('my_cars', payload);
  }
  async send(pattern: string, data) {
    return this.client.emit(pattern, data).toPromise();
  }

  getSseObservable() {
    return this.sseSubject.asObservable();
  }
}
