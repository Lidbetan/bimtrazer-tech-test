import { Block } from "@/interfaces/block";
import { Button, Progress } from "@nextui-org/react";
import ProgressBar from "./progressBar";
import { UseMyStore } from "@/app/store/blocksStore";

export default function BlockItem({ itemData }: { itemData: Block }) {
    const { removeBlock } = UseMyStore();
    return (
        <>
            <p>{itemData.description}</p>
            <p>{itemData.startDate}</p>
            <p>{itemData.endDate}</p>
            <ProgressBar progress={itemData.progress} />
            <Button onClick={() => removeBlock(itemData.id)}>
                Delete Block
            </Button>
        </>
    );
}
