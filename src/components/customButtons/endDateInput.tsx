import React from "react";
import { DateInput } from "@nextui-org/react";
import { DateValue, now, parseAbsoluteToLocal } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function App() {
    let [date, setDate] = React.useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    console.log(`Date en End ${date}`);

    return (
        <div className="w-full max-w-xl flex flex-col items-start gap-4">
            <DateInput
                granularity="second"
                label="End Date"
                value={date}
                onChange={setDate}
            />
        </div>
    );
}
