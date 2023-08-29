
module.exports = getSumAndAvgByType = (data, types) => {
  const dataItemsAmount = {}
  return data.reduce((result, item) => {
    if (!types[item?.type.id]) return result;
    const typeId = item.type.id;

    dataItemsAmount[typeId] = dataItemsAmount[typeId] + 1 || 1;
    result[`${types[typeId]}Sum`] = result[`${types[typeId]}Sum`] + item.price || item.price;
    result[`${types[typeId]}Avg`] = result[`${types[typeId]}Sum`] / dataItemsAmount[typeId];
    return result;
  }, {});
}
