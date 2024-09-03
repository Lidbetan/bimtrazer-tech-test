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
        //Verifies if block already exist
        const existingBlockIndex = blocks.findIndex(
            (item) => item.id === response.id
        );
        //If exist, just update the data, just progress at moment
        if (existingBlockIndex !== -1) {
            const updatedBlocks = [...blocks];
            updatedBlocks[existingBlockIndex] = {
                ...updatedBlocks[existingBlockIndex],
                progress: response.progress,
            };
            set({ blocks: updatedBlocks });
            //If not exist, create a new one.
        } else {
            set({ blocks: [...blocks, response] });
        }
    },
    //Updates blockList when removes a block, receives the block's ID as argument to filter the existing list.
    removeBlock: (id) => {
        const { blocks } = get();
        const filteredBlocksList = blocks.filter((item) => item.id != id);
        set({ blocks: filteredBlocksList });
    },
}));
