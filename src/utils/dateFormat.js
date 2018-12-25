export const dateFormat = (selectYear, selectQuarterIndex) => {
  let begDate = '';
  let endDate = '';
  switch (selectQuarterIndex) {
    case 0:
      begDate = `${selectYear}-01-01 00:00:00`;
      endDate = `${selectYear}-12-31 23:59:59`;
      break;
    case 1:
      begDate = `${selectYear}-01-01 00:00:00`;
      endDate = `${selectYear}-03-31 23:59:59`;
      break;
    case 2:
      begDate = `${selectYear}-04-01 00:00:00`;
      endDate = `${selectYear}-06-30 23:59:59`;
      break;
    case 3:
      begDate = `${selectYear}-07-01 00:00:00`;
      endDate = `${selectYear}-09-30 23:59:59`;
      break;
    case 4:
      begDate = `${selectYear}-10-01 00:00:00`;
      endDate = `${selectYear}-12-31 23:59:59`;
      break;
  }
  return {begDate, endDate}
}