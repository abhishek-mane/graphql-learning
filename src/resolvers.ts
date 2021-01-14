import { MongoDBService } from "./services/mongodb";
import { totalBuysQuery, totalSellsQuery } from "./services/queries";

async function getAccount({ id }) {
  const mongo = await MongoDBService.getInstance();
  const accounts = mongo.getCollection("sample_analytics", "accounts");
  return accounts.findOne({ account_id: id });
}

async function getAccounts({ skip = 0, limit = 10 }) {
  const mongo = await MongoDBService.getInstance();
  const accounts = mongo.getCollection("sample_analytics", "accounts");
  return accounts.find().skip(skip).limit(limit).toArray();
}

async function getCustomer({ username }) {
  const mongo = await MongoDBService.getInstance();
  const customer = mongo.getCollection("sample_analytics", "customers");
  return customer.findOne({ username });
}

async function getCustomers({ skip = 0, limit = 10 }) {
  const mongo = await MongoDBService.getInstance();
  const accounts = mongo.getCollection("sample_analytics", "customers");
  return accounts.find().skip(skip).limit(limit).toArray();
}

async function getTotalBuys({ username }) {
  const mongo = await MongoDBService.getInstance();
  const customers = mongo.getCollection("sample_analytics", "customers");
  return customers.aggregate(totalBuysQuery(username)).toArray();
}

async function getTotalSells({ username }) {
  const mongo = await MongoDBService.getInstance();
  const customers = mongo.getCollection("sample_analytics", "customers");
  return customers.aggregate(totalSellsQuery(username)).toArray();
}

export const resolvers = {
  Query: {
    getAccount: (_, args) => getAccount(args),
    getAccounts: (_, args) => getAccounts(args),
    getCustomer: (_, args) => getCustomer(args),
    getCustomers: (_, args) => getCustomers(args),
    getTotalBuys: (_, args) => getTotalBuys(args),
    getTotalSells: (_, args) => getTotalSells(args),
  },
};
