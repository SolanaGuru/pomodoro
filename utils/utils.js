exports.convertS2C = (dataList) => {
  let result = {}
  for (const data of dataList) {
    result[data.name] = parseData(data.value, data.type);
  }
  return result
}

exports.convertC2S = (data) => {

  let result = []
  for (const key in data) {
    result.push({name: key, value: data[key] + "", type: typeof data[key]})
  }
  return result;
}

const parseData = (value, type) => {

  switch (type) {
    case "number":
      return parseInt(value)
    case "boolean":
      return value === "true";
    case "object":
      return value === "null"? null : value
    default:
      return value
  }
}