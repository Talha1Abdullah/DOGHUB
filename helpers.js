import {
  PAYLOAD,
  URL_PARAMETERS,
  URL_PARAMETERS_AND_PAYLOAD,
  URL_AND_QUERY_PARAMETERS,
  QUERY_PARAMETERS,
  QUERY_PARAMETERS_AND_PAYLOAD,
  GET_PARAMETERS,
} from './src/api/urls';

import {API_URL, CONSUMER_KEY, CONSUMER_SECRET} from './src/config';

let API_KEY_REQ_PARAMS = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
};

export function parseUrlData(api_data, data, payload) {
  const {type, url, parameters} = api_data;
  // const updatedUrl = parameters.reduce((acc, parameter) => acc.replace(parameter, data[parameter]), url);
  const handlers = {
    [PAYLOAD]: () => ({...api_data, data: data}),
    [URL_PARAMETERS_AND_PAYLOAD]: () => ({
      ...api_data,
      url: API_URL + url.replace(parameters[0], data[parameters[0]]),
      data: payload,
      params: API_KEY_REQ_PARAMS,
    }),
    [QUERY_PARAMETERS_AND_PAYLOAD]: () => ({
      ...api_data,
      data: payload,
      params: {...data, ...API_KEY_REQ_PARAMS},
    }),
    [URL_PARAMETERS]: () => ({
      ...api_data,
      url: API_URL + url.replace(parameters[0], data[parameters[0]]),
    }),
    [URL_AND_QUERY_PARAMETERS]: () => ({
      ...api_data,
      url: API_URL + url.replace(parameters[0], data[parameters[0]]),
      params: {...data, ...API_KEY_REQ_PARAMS},
    }),
    [QUERY_PARAMETERS]: () => ({
      ...api_data,
      params: {...data, ...API_KEY_REQ_PARAMS},
    }),
    [GET_PARAMETERS]: () => api_data,
  };
  return handlers[type]();
}

// export function validateEmail(email) {
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   let is_valid_email = reg.test(email);
//   return is_valid_email;
// }

// 1st Version
// export function parseUrlData(api_data, data, payload) {
//   let url_data = {
//     ...api_data,
//     data: null,
//     params: null,
//   };
//   let url = api_data.url;

//   switch (api_data.type) {
//     // req like login/signup without token/API_KEY
//     // example endpoint https://jbs.com/signup/ (postman) body/data {username:username,password:password}
//     case PAYLOAD:
//       url_data = {
//         ...api_data,
//         data: data,
//       };
//       return url_data;
//     // req like update specific product with product_id
//     // example endpoint https://jbs.com/products/product_id
//     case URL_PARAMETERS_AND_PAYLOAD: {
//       for (let parameter of api_data.parameters) {
//         url = url.replace(parameter, data[parameter]);
//       }
//       url_data = {
//         ...api_data,
//         url: API_URL + url,
//         data: payload,
//         params: {...API_KEY_REQ_PARAMS},
//       };
//       console.log('url_after_replaced: ', url);
//       return url_data;
//     }
//     // req like product with category query parameter and post new data
//     // example endpoint https://jbs.com/products? category=255
//     // (postman) body/data {product_name:"",price:""}
//     case QUERY_PARAMETERS_AND_PAYLOAD: {
//       url_data = {
//         ...api_data,
//         data: payload,
//         params: {...data, ...API_KEY_REQ_PARAMS},
//       };
//       return url_data;
//     }

//     // req like product with product_id
//     // example https://jbs.com/products/product_id without token/API_KEY req
//     case URL_PARAMETERS:
//       for (let parameter of api_data.parameters) {
//         url = url.replace(parameter, data[parameter]);
//       }
//       url_data = {
//         ...api_data,
//         url: API_URL + url,
//       };
//       console.log('url_after_replaced: ', url);
//       return url_data;

//     // req like product with product_id
//     // example https://jbs.com/products/product_id?limit=50
//     case URL_AND_QUERY_PARAMETERS:
//       for (let parameter of api_data.parameters) {
//         url = url.replace(parameter, data[parameter]);
//       }
//       url_data = {
//         ...api_data,
//         url: API_URL + url,
//         params: {...data, ...API_KEY_REQ_PARAMS},
//       };
//       console.log('url_after_replaced: ', url);
//       return url_data;

//     // req like product with category query parameter without token/API_KEY
//     // example endpoint https://jbs.com/products? category=255
//     case QUERY_PARAMETERS:
//       url_data = {
//         ...api_data,
//         params: {...data, ...API_KEY_REQ_PARAMS},
//       };
//       return url_data;
//     case GET_PARAMETERS:
//       break;
//     default:
//       return;
//   }
// }

// 3rd Version
// import { API_URL, CONSUMER_KEY, CONSUMER_SECRET } from './src/config';
// import { PAYLOAD, URL_PARAMETERS, URL_PARAMETERS_AND_PAYLOAD, URL_AND_QUERY_PARAMETERS, QUERY_PARAMETERS, QUERY_PARAMETERS_AND_PAYLOAD } from './src/api/urls';

// const API_KEY_REQ_PARAMS = {
//   consumer_key: CONSUMER_KEY,
//   consumer_secret: CONSUMER_SECRET,
// };

// export function parseUrlData(apiData, data, payload) {
//   const { type, url, parameters } = apiData;
//   let urlData = { ...apiData, data: null, params: null };

//   switch (type) {
//     case PAYLOAD:
//       urlData = { ...apiData, data };
//       break;
//     case URL_PARAMETERS_AND_PAYLOAD:
//       const updatedUrl = parameters.reduce((acc, parameter) => acc.replace(parameter, data[parameter]), url);
//       urlData = { ...apiData, url: API_URL + updatedUrl, data: payload, params: { ...API_KEY_REQ_PARAMS } };
//       break;
//     case QUERY_PARAMETERS_AND_PAYLOAD:
//       urlData = { ...apiData, data: payload, params: { ...data, ...API_KEY_REQ_PARAMS } };
//       break;
//     case URL_PARAMETERS:
//       const replacedUrl = parameters.reduce((acc, parameter) => acc.replace(parameter, data[parameter]), url);
//       urlData = { ...apiData, url: API_URL + replacedUrl };
//       break;
//     case URL_AND_QUERY_PARAMETERS:
//       const newUrl = parameters.reduce((acc, parameter) => acc.replace(parameter, data[parameter]), url);
//       urlData = { ...apiData, url: API_URL + newUrl, params: { ...data, ...API_KEY_REQ_PARAMS } };
//       break;
//     case QUERY_PARAMETERS:
//       urlData = { ...apiData, params: { ...data, ...API_KEY_REQ_PARAMS } };
//       break;
//     default:
//       return null;
//   }

//   return urlData;
// }
