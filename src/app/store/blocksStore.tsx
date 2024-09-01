"use client";
import { create } from "zustand";
import { Block } from "@/interfaces/block";
import { DataFetch } from "@/utils/dataFetch";

interface BlockStore {
    blocks: Block[];
    fetchList: () => void;
    updateBlockStore: (response: Block) => void;
    removeBlock: (id: string) => void;
}
export const UseMyStore = create<BlockStore>((set, get) => ({
    blocks: [],
    //Fetch the data and assigns it to blocks
    fetchList: async () => {
        const dataList = await DataFetch();
        set({ blocks: dataList.blockList });
    },
    //Update blocksList when adding a new block
    updateBlockStore: (response) => {
        const { blocks } = get();
        set({ blocks: [...blocks, response] });
    },
    //Updates blockList when removes a block, receives the block's ID as argument to filter the existing list.
    removeBlock: (id) => {
        const { blocks } = get();
        const filteredBlocksList = blocks.filter((item) => item.id != id);
        set({ blocks: filteredBlocksList });
    },
}));
