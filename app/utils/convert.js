import moment from 'moment';

export const convertDate = (stringDate) => {
  return moment.utc(stringDate).local().format('MMM DD YYYY, hh:mm a');
};
