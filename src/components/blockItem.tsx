import { Block } from "@/interfaces/block";
import { Progress } from "@nextui-org/react";
import ProgressBar from "./progressBar";

export default function BlockItem({ itemData }: { itemData: Block }) {
    return (
        <>
            <p>{itemData.description}</p>
            <p>{itemData.startDate}</p>
            <p>{itemData.endDate}</p>
            <ProgressBar progress={itemData.progress} />
        </>
    );
}
