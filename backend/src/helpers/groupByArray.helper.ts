export const groupBy = <T>(
  arr: T[],
  property: string,
): { [key: string]: T[] } => {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
};
