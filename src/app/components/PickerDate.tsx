import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import {today, getLocalTimeZone, CalendarDate} from "@internationalized/date";

export default function PickerDate({
  now = today(getLocalTimeZone()),
  disabledRanges = [],
  label,
  labelPlacement = "outside",
  setDateRange
}: {
  now?: CalendarDate
  disabledRanges?: [CalendarDate, CalendarDate][]
  label: string
  labelPlacement?: "outside" | "inside"
  setDateRange: (value: RangeValue<DateValue>) => void
}) {

  return (
    <DateRangePicker
      label={label}
      labelPlacement={labelPlacement}
      isDateUnavailable={(date) =>
        disabledRanges.some(
          (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
        )
      }
      visibleMonths={2}
      minValue={now}
      validate={(value) =>{
        console.log({value})
        setDateRange(value)
        return (disabledRanges.some(
          (interval) => value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0,
        )
        ? "Selected date range may not include unavailable dates."
        : null)
      }}
      validationBehavior="native"
    />
  );
}