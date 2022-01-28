const APIKey = "GZWDTWWY37JO";
const axios = require('axios');

export async function searchGif(searchTerm) {
  const lmt = 10;
  const search_url = "https://g.tenor.com/v1/search?q=" + searchTerm + "&key=" +
            APIKey + "&limit=" + lmt;
  return axios.get(search_url)
    .then(res => {
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';

      const result = res.data;
      // console.log(result)
      return result
    })
    .catch(err => {
      console.log('Error: ', err.message);
    });

}
