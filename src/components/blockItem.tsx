import { Block } from "@/interfaces/block";

export default function BlockItem({ itemData }: { itemData: Block }) {
    return (
        <>
            <p>{itemData.description}</p>
            <p>{itemData.startDate}</p>
            <p>{itemData.endDate}</p>
            <p>{itemData.progress}</p>
        </>
    );
}
