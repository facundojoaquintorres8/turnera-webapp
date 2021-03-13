export function formatDateFromIDate(date: IDate): string {
    return date.year + '-' + formatNumberToTwoDigits(date.month) + '-'
        + formatNumberToTwoDigits(date.day);
}

export function formatDateFromDate(date: Date): string {
    return date.getFullYear() + '-' + formatNumberToTwoDigits(date.getMonth() + 1) + '-'
        + formatNumberToTwoDigits(date.getDate());
}

export function formatTimeFromITime(time: ITime): string {
    return formatNumberToTwoDigits(time.hour) + ':'
        + formatNumberToTwoDigits(time.minute) + ':' + formatNumberToTwoDigits(time.second);
}

function formatNumberToTwoDigits(number: number) {
    return ("00" + number).slice(-2);
}

export function formatIDateFromDate(date: Date): IDate {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

export interface IDate {
    year: number;
    month: number;
    day: number;
}

export interface ITime {
    hour: number;
    minute: number;
    second: number;
}