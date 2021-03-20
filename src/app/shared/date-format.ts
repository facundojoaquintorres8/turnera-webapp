import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export function formatDateFromNgbDateStruct(date: NgbDateStruct): string {
    return date.year + '-' + formatNumberToTwoDigits(date.month) + '-'
        + formatNumberToTwoDigits(date.day);
}

export function formatDateFromDate(date: Date): string {
    return date.getFullYear() + '-' + formatNumberToTwoDigits(date.getMonth() + 1) + '-'
        + formatNumberToTwoDigits(date.getDate());
}

export function formatTimeFromNgbTimeStruct(time: NgbTimeStruct): string {
    return formatNumberToTwoDigits(time.hour) + ':'
        + formatNumberToTwoDigits(time.minute) + ':' + formatNumberToTwoDigits(time.second);
}

function formatNumberToTwoDigits(number: number) {
    return ("00" + number).slice(-2);
}

export function formatNgbDateStructFromDate(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}