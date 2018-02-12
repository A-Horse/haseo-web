// @flow

export class AuthService {
  jwt: string;

  constructor() {
    this.loadJwtFromLocalStorage();
  }

  loadJwtFromLocalStorage(): void {
    this.jwt = window.localStorage.getItem('jwt');
  }

  setJwt(jwt: string): void {
    this.jwt = jwt;
  }

  getJwt(): string {
    return this.jwt;
  }

  cleanJwt(): void {
    window.localStorage.removeItem('jwt');
  }
}
