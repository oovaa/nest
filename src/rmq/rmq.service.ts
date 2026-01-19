import { Injectable } from '@nestjs/common';

@Injectable()
export class RmqService {
  handleRMQ(data) {
    console.log('data recived', data);
  }
}
