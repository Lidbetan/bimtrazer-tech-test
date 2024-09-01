"use client";
import { create } from "zustand";
import { Block } from "@/interfaces/block";
import data from "../../data/data.json";

const { blockList }: { blockList: Block[] } = data;

interface BlockStore {
    blocksList: Block[];
    updateBlockStore: (response: Block) => void;
    removeBlock: (id: string) => void;
}
export const UseMyStore = create<BlockStore>((set, get) => ({
    blocksList: blockList,
    //Update blocksList when adding a new block
    updateBlockStore: (response) => {
        const { blocksList } = get();
        set({ blocksList: [...blocksList, response] });
    },
    //Updates blockList when removes a block, receives the block's ID as argument to filter the existing list.
    removeBlock: (id) => {
        const { blocksList } = get();
        const filteredBlocksList = blocksList.filter((item) => item.id != id);
        set({ blocksList: filteredBlocksList });
    },
}));
