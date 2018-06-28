import {
    subDays,
    subMonths,
    subYears,
    differenceInDays,
    differenceInYears,
    differenceInMonths,
    isBefore,
    parse,
    format,
    isValid,
    isDate,
    isFuture
} from 'date-fns'

export const isValidDate = (val: string): boolean => {
    let date = parse(val)
    return isDate(date)
        && isValid(date)
        && !isFuture(date)
        && differenceInYears(Date.now(), date) < 150;
}