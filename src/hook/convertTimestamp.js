function convertTimestamp(timestamp) {
  // 밀리세컨드를 Date 객체로 변환
  const date = new Date(timestamp);

  // 각 항목을 추출
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 추가합니다.
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  //return { year: year, month: month, day: day, hours: hours, minutes: minutes };
  return `${month}.${day} ${hours}:${minutes}`;
}
export default convertTimestamp;
