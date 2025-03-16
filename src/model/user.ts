export default class UserModel {
  name: string
  last_login_at: string
  constructor(obj: any) {
    this.name = obj.name
    this.last_login_at = obj.last_login_at
  }
}
