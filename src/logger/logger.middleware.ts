import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log(
      `path ${req.url} method ${req.method} - body ${JSON.stringify(req.body)}`,
    );

    next();
  }
}
