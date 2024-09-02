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
    //Manages progress value number
    const [progressValue, setProgressValue] = useState(0);
    //Manages conditional rendering of alert
    const [valid, setValid] = useState<boolean>(true);
    //Manages error state of Progress Input
    const [errorInput, setErrorInput] = useState<boolean>(false);
    //Manages max limit characters
    const [limitMsg, setLimitMsg] = useState({
        limit: 40,
        actual: 0,
    });
    //Manage succes message
    const [succes, setSuccess] = useState<boolean>(false);
    //Random ID
    const randomId = Date.now().toString(16);

    //New block data
    const originalStartDateString = startDate.toString();
    const formattedStartDate: string | null = originalStartDateString
        ? originalStartDateString
              .slice(0, originalStartDateString.indexOf("["))
              .trim()
        : "fecha no disponible";

    const originalEndDateString = startDate.toString();
    const formattedEndDate: string | null = originalEndDateString
        ? originalEndDateString
              .slice(0, originalEndDateString.indexOf("["))
              .trim()
        : "fecha no disponible";

    const description: string = descriptionValue;
    const progress: number = progressValue;

    //Reads and sets the description input value and length
    const handleDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target.value;
        setLimitMsg({ ...limitMsg, actual: target.length });
        setDescriptionValue(target);
        //If there is any content on description input, sets valid to true to validate it
        setValid(true);
    };
    //Reads and transform the value to number
    const handleProgressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value);
        if (number > 100) {
            setErrorInput(true);
        } else {
            setErrorInput(false);
            setProgressValue(Number(e.target.value));
        }
    };
    //HandleSubmit sends the newBlock to the store
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (description.trim() !== "" && startDate && endDate) {
                //New Block declaration
                const newBlock: Block = {
                    id: randomId,
                    description: description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    progress: progress,
                };
                await updateBlockStore(newBlock);
                setSuccess(true);
            } else {
                setSuccess(false);
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
                className="flex relative w-full flex-col gap-6 mx-auto max-w-[750px] md:grid grid-cols-2 grid-rows-2"
            >
                <Input
                    onChange={handleDescriptionInput}
                    label="Enter description"
                    isRequired
                    isInvalid={!valid}
                    className="max-w-[350px] relative"
                    maxLength={limitMsg.limit}
                />
                <p
                    className={`w-[20px] absolute left-[250px] md:left-[300px] text-[10px] text-right${
                        limitMsg.actual === limitMsg.limit &&
                        "font-bold text-red-500"
                    }`}
                >
                    {limitMsg.actual}/{limitMsg.limit}
                </p>
                {/*--- StartDate Input Begin --- */}
                <div className="w-full max-w-xl flex flex-col items-start gap-4">
                    <DateInput
                        hourCycle={24}
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
                        hourCycle={24}
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
                    label="Enter progress value"
                    placeholder="0-100"
                    isInvalid={errorInput}
                    errorMessage="Enter a number from 0 to 100"
                    onChange={handleProgressInput}
                    className="max-w-[350px] col-span-1 row-start-2"
                />
                {/*--- Progress Input End --- */}
                {/*--- Submit Button --- */}
                <Button
                    type="submit"
                    className="text-center col-span-2 mx-auto w-full md:w-[150px] bg-amber-300"
                >
                    Submit
                </Button>
                {/*--- Succes Msg --- */}
                {succes && (
                    <Chip
                        color="success"
                        variant="bordered"
                        className="col-span-2 mx-auto w-full md:w-[150px]"
                    >
                        Task added!
                    </Chip>
                )}
                {/*--- Error msg --- */}
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
