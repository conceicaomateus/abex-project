export class User {
  active: boolean;

  delete() {
    this.active = false;
  }
}
