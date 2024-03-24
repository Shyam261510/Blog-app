import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccout = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccout) {
        return this.login(email, password);
      } else {
        return userAccout;
      }
    } catch {
      console.log("error ");
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch {
      console.log("login error");
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch {
      console.log("logout error");
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      console.log("get usere error error");
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
