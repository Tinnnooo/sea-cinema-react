export const formatBalance = (balance) => {
  const number = parseInt(balance);
  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
