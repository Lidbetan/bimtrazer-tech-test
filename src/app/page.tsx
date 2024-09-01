"use client";

import { UseMyStore } from "./store/blocksStore";
import BlockItem from "@/components/blockItem";
import AddBlockForm from "@/components/addBlockForm";
import { useEffect } from "react";
import Header from "@/components/header";

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
                <div className="flex flex-col justify-items-center items-center gap-20 md:grid grid-cols-2 lg:grid-cols-3 ">
                    {blocks &&
                        blocks.map((item) => (
                            <BlockItem key={item.id} itemData={item} />
                        ))}
                </div>
                <AddBlockForm />
            </main>
        </>
    );
}
