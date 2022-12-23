/** @format */

import showRupiah from "./rupiah";

const getProperty = (obj, prop) => {
  var parts = prop.split(".");
  if (Array.isArray(parts)) {
    var last = parts.length > 1 ? parts.pop() : parts;
    var l = parts.length,
      i = 1,
      current = parts[0];
    // jika gabungan antara kode dan no urut
    if (last.includes("kode_no_urut")) {
      return `${obj["kode"]}-${obj["no_urut"]}`;
    }
    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }

    if (typeof obj === "object") {
      return obj ? obj[last] : "";
    }

    if (prop === "jumlah") {
      return showRupiah(obj);
    }
    if (prop === "path") {
      return `<img src="${obj}" alt="" />`;
    }
    return obj;
  } else {
    // eslint-disable-next-line no-throw-literal
    throw "parts is not valid array";
  }
};

export default getProperty;
