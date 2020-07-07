import moment from 'moment-timezone';
import { DEFAULT_TIME_ZONE, DEFAULT_DATETIME_FORMAT } from './constants';

export const parseDate = value =>
  value
    ? moment
        .utc(value)
        .tz(DEFAULT_TIME_ZONE)
        .format(DEFAULT_DATETIME_FORMAT)
    : '';
