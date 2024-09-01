"use client";
import { useState } from "react";
import { Button, DateInput, Input } from "@nextui-org/react";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { Block } from "@/interfaces/block";
import { UseMyStore } from "@/app/store/blocksStore";

export default function AddBlockForm() {
    const { updateBlockStore } = UseMyStore();
    const [startDate, setStartDate] = useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    const [endDate, setEndDate] = useState<DateValue>(
        parseAbsoluteToLocal("2021-04-07T18:45:22Z")
    );
    const [descriptionValue, setDescriptionValue] = useState("");
    const [progressValue, setProgressValue] = useState(0);

    //New block data
    const formattedStartDate = startDate.toString();
    const formattedEndDate = endDate.toString();
    const description: string = descriptionValue;
    const progress: number = progressValue;

    //Reads description input value
    const handleDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionValue(e.target.value);
    };
    //Reads and transform the value to number
    const handleProgressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgressValue(Number(e.target.value));
    };
    //TODO LOGICA DEL INPUT DE PROGRESO

    //HandleSubmit TIENE QUE ENVIAR EL OBJETO CON EL NUEVO BLOQUE
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //TODO IMPROVE FORM VALIDATION
            if (description.trim() !== "") {
                //New Block
                const newBlock: Block = {
                    id: "someid",
                    description: description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    progress: progress,
                };
                console.log("NEW-BLOCK", newBlock);
                await updateBlockStore(newBlock);
            } else {
                console.log("Please, complete all fields...");
            }
        } catch (error) {
            console.log("An error has ocurred, please try again...");
        }

        //Tiene que llamar a addBlock
    };
    //SE PASA EL OBJETO A STRING

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    onChange={handleDescriptionInput}
                    label="Enter description"
                    isRequired
                />
                {/*--- StartDate Input Begin --- */}
                <div className="w-full max-w-xl flex flex-col items-start gap-4">
                    <DateInput
                        granularity="second"
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        isRequired
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
                        isRequired
                    />
                </div>
                {/*--- EndDate Input Start --- */}
                {/*--- Progress Input Start --- */}
                <Input
                    type="number"
                    isRequired
                    label="Enter progress status"
                    placeholder="0-100"
                    onChange={handleProgressInput}
                />
                {/*--- Progress Input End --- */}
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}
