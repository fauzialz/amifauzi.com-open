export const round = (value: number, decimals = 0) => {
  return Number(Math.round(Number(`${value}e${decimals}`)) + "e-" + decimals);
};
