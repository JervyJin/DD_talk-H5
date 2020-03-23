import axios from "axios";
import qs from 'qs';

export function request(url, params = {}, method) {

  return new Promise((resolve, reject) => {
    axios({
      url: url,
      params: params,
      headers: {
        "Content-Type": "application/json"
      },
      method: method
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
