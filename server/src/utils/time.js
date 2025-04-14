import moment from 'moment-timezone';
const TZ = 'Asia/Tashkent';

export const getNow = () => {
    return moment.tz(TZ).unix();
}
export const formatDate = (unix, format = 'DD.MM.YYYY') => {
    return moment.unix(unix).tz(TZ).format(format);
}