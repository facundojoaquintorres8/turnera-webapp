import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export function formatDateFromNgbDateStruct(date: NgbDateStruct): string | null {
    if (!date) {
        return null;
    }
    return date.year + '-' + formatNumberToTwoDigits(date.month) + '-'
        + formatNumberToTwoDigits(date.day);
}

export function formatDateFromDate(date: Date): string | null  {
    if (!date) {
        return null;
    }
    return date.getFullYear() + '-' + formatNumberToTwoDigits(date.getMonth() + 1) + '-'
        + formatNumberToTwoDigits(date.getDate());
}

export function formatTimeFromNgbTimeStruct(time: NgbTimeStruct): string | null  {
    if (!time) {
        return null;
    }
    return formatNumberToTwoDigits(time.hour) + ':'
        + formatNumberToTwoDigits(time.minute) + ':' + formatNumberToTwoDigits(time.second);
}

function formatNumberToTwoDigits(x: number): string {
    return ("00" + x).slice(-2);
}

export function formatNgbDateStructFromDate(date: Date): NgbDateStruct | null {
    if (!date) {
        return null;
    }
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}