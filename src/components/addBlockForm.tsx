"use client";
import { useState } from "react";
import { Button, DateInput, Input } from "@nextui-org/react";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { Block } from "@/interfaces/block";

export default function AddBlockForm() {
    let [startDate, setStartDate] = useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    let [endDate, setEndDate] = useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    // const [newBlock, setNewBlock] = useState<Block>({
    //     id: "somestringid",
    //     description: "Lo quevenga del input",
    //     startDate:,
    // });
    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    //HandleSubmit TIENE QUE ENVIAR EL OBJETO CON EL NUEVO BLOQUE
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Tiene que llamar a addBlock
    };
    console.log("Date en StartDate", startDate.set);
    console.log(`Date en End ${endDate}`);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input onChange={handleInputs} label="Enter description" />
                {/*--- StartDate Input Begin --- */}
                <div className="w-full max-w-xl flex flex-col items-start gap-4">
                    <DateInput
                        granularity="second"
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                    />
                </div>
                {/*--- StartDate Input Ends --- */}
                {/*--- EndDate Input Begin --- */}
                <div className="w-full max-w-xl flex flex-col items-start gap-4">
                    <DateInput
                        granularity="second"
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                    />
                </div>
                {/*--- EndDate Input Start --- */}
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}
