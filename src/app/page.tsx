"use client";

import { UseMyStore } from "./store/blocksStore";
import BlockItem from "@/components/blockItem";
import AddBlockForm from "@/components/addBlockForm";
import { useEffect } from "react";
import Header from "@/components/header";
import { Accordion, AccordionItem, Chip } from "@nextui-org/react";

export default function Home() {
    const { blocks, fetchList } = UseMyStore();
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
                <div className="flex flex-col gap-20 md:flex-row md:w-10/12 mx-auto">
                    {/* Accordion only shows on mobile */}
                    <Accordion
                        className="md:hidden"
                        selectionMode="multiple"
                        itemClasses={{
                            base: ["py-4]"],
                            // content: ["justify-content-center"],
                        }}
                    >
                        {blocks &&
                            blocks.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    aria-label="Chung Miller"
                                    startContent={
                                        <Chip
                                            variant="dot"
                                            className="bg-inherit"
                                            classNames={{
                                                dot: [
                                                    `${
                                                        item.progress === 100
                                                            ? "bg-green-600"
                                                            : item.progress <=
                                                              25
                                                            ? "bg-orange-600"
                                                            : "bg-blue-600"
                                                    }`,
                                                ],
                                            }}
                                        >
                                            {item.description.toUpperCase()}
                                        </Chip>
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
