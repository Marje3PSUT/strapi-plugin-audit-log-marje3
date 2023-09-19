# TODO

1. Fix log fetching issue: When users open the logs tab for the first time, the strapi backend will send them to a web address with predefined query string. This leads to two requests being made. This happens because the every browser automatically handles 301 and 302 redirects, with no option to disable them. So, the only option available is to compare the request's address with the address in the response. If they don't match, the web address in the browser's bar is updated, causing yet another data retrieval process. (TODO: add enabled toggle to useQuery to bypass 2nd refresh)

2. Add column hide/show menu.