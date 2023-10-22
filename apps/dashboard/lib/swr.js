import useSWR from "swr";

/** Create SWR handler
 * @param { string } url The url to fetch
 * @returns { JSON } The response from the url
 */
export function SWR(url, interval = 30000) {
 return useSWR(
  url,
  (href) =>
   fetch(href, {
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
   }).then((res) => res.json()),
  { refreshInterval: interval }
 );
}
