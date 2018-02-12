// @flow

import R from 'ramda';

class DI {
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

export default new DI();
