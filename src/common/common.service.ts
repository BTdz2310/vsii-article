import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CommonService {
  getPublicKey() {
    const key = process.env.PUBLIC_KEY;
    const keyPath = join(process.cwd(), 'keys', key);
    return fs.readFileSync(keyPath, 'utf8');
  }
}
