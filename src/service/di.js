// @flow

import R from 'ramda';
import { AuthService } from './auth.service';
import { EpicAdapterService } from './epic-adapter.service';

class DIContainer {
  services = [];

  constructor() {}

  inject(services: any | Array<any>) {
    if (Array.isArray(services)) {
      services.forEach(service => {
        this.injectService(service);
      });
    } else {
      const service = services;
      this.injectService(service);
    }
  }

  injectService(service: any): void {
    this.services.push(service);
  }

  get(serviceClass: any): any {
    return R.find(service => {
      return service instanceof serviceClass;
    })(this.services);
  }
}

const DI = new DIContainer();

DI.inject([new AuthService(), new EpicAdapterService()]);

export default DI;
