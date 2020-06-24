// 时间解析
const formatNumber = n => {

  n = n.toString()

  return n[1] ? n : '0' + n

}
module.exports = {

  formatTime: formatTime

}
function formatTime(timestamp, format) {

  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];

  let date = new Date(timestamp);
  let year = date.getFullYear()
  let month = date.getMonth()+1 
  let day = date.getDate()
  let hour = date.getHours() 
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second);

  returnArr = returnArr.map(formatNumber);

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;

}