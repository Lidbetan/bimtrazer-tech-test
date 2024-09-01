"use client";
import { Button } from "@nextui-org/react";
import { UseMyStore } from "./store/blocksStore";
import BlockItem from "@/components/blockItem";
import AddBlockForm from "@/components/addBlockForm";

export default function Home() {
    const { blocksList } = UseMyStore();
    console.log(blocksList);

    const newBlock = {
        id: "6671997cfcac3e0bfbe8607c",
        description: "SUPER FANCY STAIRS",
        startDate: "2024-06-03T00:00:00",
        endDate: "2024-06-03T23:59:59",
        progress: 75,
    };

    return (
        <>
            <header>
                <h1>Block List</h1>
            </header>
            <main className="flex flex-col place-content-center ">
                {blocksList &&
                    blocksList.map((item) => (
                        <BlockItem key={item.id} itemData={item} />
                    ))}
                <AddBlockForm />
            </main>
            <footer>Footer</footer>
        </>
    );
}
