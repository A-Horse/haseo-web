// @flow

import { mapping } from '../constant/mapping';

export class MappingService {
  static map(name: string): string {
    return mapping[name];
  }
}
