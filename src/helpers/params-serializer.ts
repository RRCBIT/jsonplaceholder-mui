/* eslint-disable no-restricted-syntax */
const paramsSerializer = (params: any) => {
  let str: string = "";
  for (const key in params) {
    if (key) {
      if (
        typeof params[key] !== "object" &&
        params[key] !== "" &&
        params[key] !== false &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        if (str !== "") {
          str += "&";
        }
        str += `${key}=${params[key]}`;
      }
      if (typeof params[key] === "object") {
        let strObj: string = "";
        if (str !== "") {
          str += "&";
        }
        str += `${key}=`;
        for (const keyNest in params[key]) {
          if (
            typeof params[key][keyNest] !== "object" &&
            params[key][keyNest] !== undefined &&
            params[key][keyNest] !== ""
          ) {
            if (strObj !== "") {
              strObj += ";";
            }
            strObj += `${keyNest}:${params[key][keyNest]}`;
          }
        }
        str += strObj;
      }
    }
  }
  return str;
};

export default paramsSerializer;
