import { MongoClient } from "mongodb";
const MONGO_URI = process.env["MONGO_URI"] || ""; // tslint:disable-line : no-string-literal

export class MongoDBService {
  private static instance: MongoDBService;
  private readonly mongo = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  private async init() {
    await this.mongo.connect();
  }

  public getCollection(dbName, collectionName) {
    const db = this.mongo.db(dbName);
    return db.collection(collectionName);
  }

  public static async getInstance(): Promise<MongoDBService> {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
      await MongoDBService.instance.init();
    }
    return MongoDBService.instance;
  }
}
