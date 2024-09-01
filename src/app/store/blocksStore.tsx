"use client";
import { create } from "zustand";
import { Block } from "@/interfaces/block";
import data from "../../data/data.json";

const { blockList }: { blockList: Block[] } = data;

interface BlockStore {
    blocksList: Block[];
    updateBlockStore: (response: Block) => void;
}
export const UseMyStore = create<BlockStore>((set, get) => ({
    blocksList: blockList,
    updateBlockStore: (response) => {
        const { blocksList } = get();
        set({ blocksList: [...blocksList, response] });
    },
}));
