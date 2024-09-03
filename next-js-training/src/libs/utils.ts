import { differenceInYears } from "date-fns";


export function CalculateAge(dob: Date) {
    return differenceInYears(Date.now(), dob)
}