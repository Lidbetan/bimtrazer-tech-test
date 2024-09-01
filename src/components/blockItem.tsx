import { Block } from "@/interfaces/block";
import { Button, Chip } from "@nextui-org/react";
import ProgressBar from "./progressBar";
import { UseMyStore } from "@/app/store/blocksStore";
import { DeleteIcon } from "./icons/deleteIcon";

export default function BlockItem({ itemData }: { itemData: Block }) {
    const { removeBlock } = UseMyStore();
    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center w-full max-w-60 border-2 border-amber-200 p-5 rounded-3xl shadow-lg transition ease-in-out duration-700 hover:scale-110">
                <Chip
                    variant="dot"
                    className="bg-inherit hidden md:flex"
                    classNames={{
                        dot: [
                            `${
                                itemData.progress === 100
                                    ? "bg-green-600"
                                    : itemData.progress <= 25
                                    ? "bg-orange-600"
                                    : "bg-blue-600"
                            }`,
                        ],
                    }}
                >
                    {itemData.description.toUpperCase()}
                </Chip>
                <div className="flex flex-col text-[12px]">
                    <span>Start date</span>
                    <Chip>{itemData.startDate}</Chip>
                </div>
                <div className="flex flex-col text-[12px]">
                    <span>End Date</span>
                    <Chip>{itemData.endDate}</Chip>{" "}
                </div>

                <ProgressBar progress={itemData.progress} />
                {/* Delete Button */}
                <Button
                    onClick={() => removeBlock(itemData.id)}
                    className="bg-red-400 w-full p-2 rounded-full md:w-[20px]"
                >
                    <DeleteIcon fillColor="#000" />
                </Button>
            </div>
        </>
    );
}
