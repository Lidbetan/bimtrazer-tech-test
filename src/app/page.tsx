"use client";

import { UseMyStore } from "./store/blocksStore";
import BlockItem from "@/components/blockItem";
import AddBlockForm from "@/components/addBlockForm";
import { useEffect } from "react";
import Header from "@/components/header";
import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/deleteIcon";

export default function Home() {
    const { blocks, fetchList, removeBlock } = UseMyStore();
    //Makes the call to fetch the data and updates the store with it
    useEffect(() => {
        const fetchData = async () => {
            fetchList(); //Calls fetchList from the store
        };
        fetchData(); //Executes, retrieve the data and updates blocks in the store
    }, [fetchList]);

    return (
        <>
            <Header />
            <main className="w-11/12 flex flex-col gap-10 mx-auto md:max-w-[768px] lg:max-w-[1024px] my-[5rem]">
                <div className="flex flex-col w-11/12 gap-20 md:flex-row md:w-10/12 mx-auto">
                    {/* Accordion only shows on mobile */}
                    <Accordion
                        className="md:hidden"
                        selectionMode="multiple"
                        itemClasses={{
                            base: ["py-4]"],
                            content: ["ml-8"],
                        }}
                    >
                        {blocks &&
                            blocks.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    aria-label="Task-Item"
                                    classNames={{
                                        startContent: [
                                            "flex flex-row w-11/12 items-center gap-3 justify-between ",
                                        ],
                                    }}
                                    startContent={
                                        <>
                                            <Chip
                                                variant="dot"
                                                className="bg-inherit"
                                                classNames={{
                                                    dot: [
                                                        `${
                                                            item.progress ===
                                                            100
                                                                ? "bg-green-600"
                                                                : item.progress <=
                                                                  25
                                                                ? "bg-orange-600"
                                                                : "bg-blue-600"
                                                        }`,
                                                    ],
                                                    content: [
                                                        "overflow-hidden  max-w-[170px]",
                                                    ],
                                                }}
                                            >
                                                {item.description.toUpperCase()}
                                            </Chip>
                                            <Button
                                                onClick={() =>
                                                    removeBlock(item.id)
                                                }
                                                className="bg-red-400 h-[22px] min-w-[15px] w-[22px] p-1 rounded-full md:hidden"
                                            >
                                                <DeleteIcon
                                                    fillColor="#000"
                                                    width="12"
                                                    height="12"
                                                />
                                            </Button>
                                        </>
                                    }
                                >
                                    <BlockItem key={item.id} itemData={item} />
                                </AccordionItem>
                            ))}
                    </Accordion>
                    {/* At larger sizes displays with cards */}
                    <div className="hidden md:flex gap-6 flex-wrap justify-center items-center mx-auto">
                        {blocks &&
                            blocks.map((item) => (
                                <BlockItem key={item.id} itemData={item} />
                            ))}
                    </div>
                </div>

                <AddBlockForm />
            </main>
        </>
    );
}
