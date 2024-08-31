import React from "react";
import { DateInput } from "@nextui-org/react";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";

export default function App() {
    let [startDate, setStartDate] = React.useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    console.log(`Date en Start ${startDate}`);

    return (
        <div className="w-full max-w-xl flex flex-col items-start gap-4">
            <DateInput
                granularity="second"
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
            />
        </div>
    );
}
