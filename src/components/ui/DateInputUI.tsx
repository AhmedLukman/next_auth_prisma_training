'use client'

import React from 'react'
import { DateInput, DateValue } from '@nextui-org/react'
import { CalendarDate } from "@internationalized/date";


const DateInputUI = ({date}: {date: Date}) => {
  return (
    <DateInput
      label={"Created date"}
      isDisabled
      variant="underlined"
      defaultValue={new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())}
    />
  );
}

export default DateInputUI