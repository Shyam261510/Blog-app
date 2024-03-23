import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, status, userID }) {
    conf.app;
    try {
      return await this.databases.createDocument(
        conf.dataBase_id,
        conf.collection_id,
        slug, // passing slug (path) as a document  id
        {
          title,
          content,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log(error, "create post error");
    }
  }
  async updatePost(slug, { title, content, status }) {
    try {
      conf.dataBase_id,
        conf.collection_id,
        slug,
        {
          title,
          content,
          status,
        };
    } catch (error) {
      console.log(error, "update Post error");
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.dataBase_id,
        conf.collection_id,
        slug
      );
      return true;
    } catch (error) {
      console.log(error, "delete error");
      return false;
    }
  }
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.dataBase_id,
        conf.collection_id,
        slug
      );
      return true;
    } catch (error) {
      console.log(error, "get post error");
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.dataBase_id,
        conf.collection_id,
        queries,
        100,
        0
      );
    } catch (error) {
      console.log(error, "get Posts error");
    }
  }
  async fileUpload(file) {
    try {
      await this.bucket.createFile(conf.bucket_id, ID.unique(), file);
    } catch (error) {
      console.log(error, "file upload error");
      return false;
    }
  }
  async deletePosts(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucket_id, fileId);
      return true;
    } catch {
      console.log("deletePost error");
      return false;
    }
  }
  filePreview(fileId) {
    return this.bucket.getFilePreview(conf.bucket_id, fileId);
  }
}

const service = new Service();
export default service;
