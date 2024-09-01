"use client";
import { useState } from "react";
import { Button, Chip, DateInput, Input } from "@nextui-org/react";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { Block } from "@/interfaces/block";
import { UseMyStore } from "@/app/store/blocksStore";

export default function AddBlockForm() {
    const { updateBlockStore } = UseMyStore();
    const [startDate, setStartDate] = useState<DateValue>(
        parseAbsoluteToLocal("2024-09-01T18:45:22Z")
    );
    const [endDate, setEndDate] = useState<DateValue>(
        parseAbsoluteToLocal("2024-09-01T18:45:22Z")
    );
    const [descriptionValue, setDescriptionValue] = useState("");
    const [progressValue, setProgressValue] = useState(0);
    const [valid, setValid] = useState(true);
    //Random ID
    const randomId = Date.now().toString(16);
    //New block data
    const formattedStartDate = startDate
        .toString()
        .replace("[America/Buenos_Aires]", " ")
        .trim();
    const formattedEndDate = endDate
        .toString()
        .replace("[America/Buenos_Aires]", " ")
        .trim();
    const description: string = descriptionValue;
    const progress: number = progressValue;

    //Reads description input value
    const handleDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionValue(e.target.value);
        //If there is any content on description input, sets valid to true
        setValid(true);
    };
    //Reads and transform the value to number
    const handleProgressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgressValue(Number(e.target.value));
    };

    //TODO LOGICA DEL INPUT DE PROGRESO

    //HandleSubmit sends the newBlock to the store
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (description.trim() !== "") {
                //New Block declaration
                const newBlock: Block = {
                    id: randomId,
                    description: description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    progress: progress,
                };
                await updateBlockStore(newBlock);
            } else {
                setValid(false);
            }
        } catch (error) {
            console.error(
                "Ha ocurrido un erro con su solicitud, intenter nuevamente...",
                error
            );
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mx-auto max-w-[750px] md:grid grid-cols-2 grid-rows-2"
            >
                <Input
                    onChange={handleDescriptionInput}
                    label="Enter description"
                    isRequired
                    className="max-w-[350px]"
                />
                {/*--- StartDate Input Begin --- */}
                <div className="w-full max-w-xl flex flex-col items-start gap-4">
                    <DateInput
                        granularity="second"
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        isRequired
                        className="max-w-[350px]"
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
                        className="max-w-[350px]"
                    />
                </div>
                {/*--- EndDate Input Start --- */}
                {/*--- Progress Input Start --- */}
                <Input
                    type="number"
                    label="Enter progress status"
                    placeholder="0-100"
                    onChange={handleProgressInput}
                    className="max-w-[350px] col-span-1 row-start-2"
                />
                {/*--- Progress Input End --- */}
                <Button
                    type="submit"
                    className="text-center col-span-2 mx-auto w-full md:w-[150px] bg-amber-300"
                >
                    Submit
                </Button>
                {!valid && (
                    <Chip
                        color="warning"
                        variant="bordered"
                        className="col-span-2 mx-auto w-full md:w-[150px]"
                    >
                        Please, complete all fields
                    </Chip>
                )}
            </form>
        </>
    );
}
