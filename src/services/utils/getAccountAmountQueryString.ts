export default function getAccountAmountQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return Number(urlParams.get('amount'));
}
