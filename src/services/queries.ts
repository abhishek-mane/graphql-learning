const getQuery = (username, type) => [
  { $match: { username } },
  { $unwind: { path: "$accounts" } },
  {
    $lookup: {
      from: "transactions",
      let: { id: "$accounts" },
      pipeline: [
        { $match: { $expr: { $eq: ["$account_id", "$$id"] } } },
        {
          $addFields: {
            transactions: {
              $filter: { input: "$transactions", as: "t", cond: { $eq: ["$$t.transaction_code", type] } },
            },
          },
        },
        { $unwind: "$transactions" },
        { $replaceRoot: { newRoot: "$transactions" } },
      ],
      as: "transactions",
    },
  },
  { $project: { username: 1, accounts: 1, transactions: 1 } },
  { $unwind: "$transactions" },
  { $group: { _id: "$accounts", username: { $first: "$username" }, amount: { $sum: "$transactions.amount" } } },
  { $project: { username: "$username", account_id: "$_id", amount: "$amount" } },
];

export const totalBuysQuery = (username) => getQuery(username, "sell");
export const totalSellsQuery = (username) => getQuery(username, "buy");
