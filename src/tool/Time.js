import moment from 'moment-timezone';

const timeZone = 'Asia/Taipei';
const format = 'YYYY-MM-DD HH:mm:ss';

/**
 * 取得日期時間
 * 
 * @param {int|null} timestamp 時間戳
 * 
 * @returns {string} 日期時間
 */
export function getDateTime(timestamp) {
    let datetime = '';
    if (timestamp === null) {
        datetime = '--';
    } else {
        datetime = moment(timestamp * 1000)
            .tz(timeZone)
            .format(format);
    }

    return datetime;
}