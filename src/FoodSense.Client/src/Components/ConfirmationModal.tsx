import { Button, Center, Flex, Group, Modal, Stack, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";

interface ConfirmationModalProps {
    title: string;
    body: string;
    onConfirm: () => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
    const close = () => props.setShow(false);
    return (
        <Modal onClose={close} opened={props.show} title={props.title}>
            <Stack>
                <Text>{props.body}</Text>
                <Flex gap={'lg'} justify={'flex-end'}>
                    <Button onClick={close} color="red">Cancel</Button>
                    <Button onClick={props.onConfirm} color="green">Confirm</Button>
                </Flex>
            </Stack>
        </Modal>
    )
}
