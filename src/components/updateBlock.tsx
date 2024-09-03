import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Chip,
} from "@nextui-org/react";
import { Block } from "@/interfaces/block";
import { UseMyStore } from "@/app/store/blocksStore";

//At moment just updates progress value
export default function UpdateBlock({ itemData }: { itemData: Block }) {
    const { updateBlockStore } = UseMyStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //Manages progress value number
    const [progressValue, setProgressValue] = useState(0);
    //Manages error state of Progress Input
    const [errorInput, setErrorInput] = useState<boolean>(false);
    //Manage succes message
    const [succes, setSuccess] = useState<boolean>(false);

    //Reads and transform the value to number
    const handleProgressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value);

        if (number > 100 || number === itemData.progress) {
            setErrorInput(true);
        } else {
            setErrorInput(false);
            setProgressValue(Number(e.target.value));
        }
    };
    //Success message dissapear delay
    const cleanSuccessMsg = () => {
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };
    //HandleSubmit sends the newBlock to the store
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (progressValue && progressValue != itemData.progress) {
                //New Block declaration
                const updatedBlock: Block = {
                    id: itemData.id,
                    description: itemData.description,
                    startDate: itemData.startDate,
                    endDate: itemData.endDate,
                    progress: progressValue,
                };
                await updateBlockStore(updatedBlock);
                setSuccess(true);
                cleanSuccessMsg();
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.error(
                "Ha ocurrido un error con su solicitud, intenter nuevamente...",
                error
            );
        }
    };

    return (
        <>
            <Button radius="full" onPress={onOpen}>
                Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {itemData.description}
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type="number"
                                        label="Enter progress value"
                                        placeholder="0-100"
                                        isInvalid={errorInput}
                                        errorMessage="Enter a number from 0 to 100 and not equal to previous progress"
                                        onChange={handleProgressInput}
                                        className="max-w-[350px] col-span-1 row-start-2"
                                    />
                                    <Button type="submit" color="primary">
                                        Update
                                    </Button>
                                </form>
                                {/*--- Succes Msg --- */}
                                {succes && (
                                    <Chip
                                        color="success"
                                        variant="bordered"
                                        className="col-span-2 mx-auto w-full md:w-[150px]"
                                    >
                                        Task updated!
                                    </Chip>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
