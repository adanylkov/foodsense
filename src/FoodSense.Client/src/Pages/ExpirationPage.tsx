import { Container, Text, Image, Title, Group, Flex, Stack, Card, Table, Button, MediaQuery, ScrollArea, Center } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api_path } from "../api";
import { FoodElementProps } from "./FoodElement";
import { FreshBadge } from "../Components/FreshBadge";
import { GoBackButton } from "../Components/GoBackButton";

export const ExpirationPage = () => {
    const { barcode } = useParams();
    const queryClient = useQueryClient();
    const { data: food, isLoading, error } = useQuery(["food", barcode], async () => {
        const response = await fetch(`${api_path}/api/Food/${barcode}`)
        if (response.status === 200) {
            return await response.json() as FoodElementProps;
        }
        throw new Error("Food not found");
    });

    const removeExpirationMutation = useMutation({
        mutationFn: async (expirationDate: string) => {
            const url = `${api_path}/api/Food/${barcode}/items`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expirationDate),
            });
            return response.status === 200;
        },
        onSuccess(data, expirationDate, context) {
            queryClient.setQueryData<FoodElementProps>(["food", barcode], (old) => {
                const index = old?.expirationInfos.findIndex(e => e.expirationDate === expirationDate);
                return {
                    ...old,
                    expirationInfos: old?.expirationInfos.filter((_, i) => i !== index)
                } as FoodElementProps;
            });
        },
    });

    const openExpirationMutation = useMutation({
        mutationFn: async (expirationDate: string) => {
            const url = `${api_path}/api/Food/${barcode}/items/`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expirationDate),
            });
            const date = await response.text();
            return date;
        },
        onSuccess(newDate, expirationDate, context) {
            queryClient.setQueryData<FoodElementProps>(["food", barcode], (old) => {
                return {
                    ...old,
                    expirationInfos: old?.expirationInfos.map(e => {
                        if (e.expirationDate === expirationDate) {
                            return {
                                ...e,
                                openedAt: newDate,
                                expirationDate: newDate,
                            }
                        }
                        return e;
                    })
                } as FoodElementProps;
            });
        },
    });

    if (isLoading || !food) {
        return <Text>Loading...</Text>
    }

    const itemsInStorage = food.expirationInfos.length;
    const fastestToSpoil = food.expirationInfos.sort((a, b) => a.daysToExpiration - b.daysToExpiration).at(0);
    const rows = food.expirationInfos.map((expirationInfo, i) => {
        return (
            <tr key={i}>
                <td>{new Date(expirationInfo.expirationDate).toLocaleDateString()}</td>
                <td>{expirationInfo.daysToExpiration}</td>
                <td>{expirationInfo.openedAt != null ? "Yes" : "No"}</td>
                <td>{expirationInfo.daysToExpiration <= 7 ? "Yes" : "No"}</td>
                <td>
                    <Button.Group>
                        <Button color="gray"
                            disabled={expirationInfo.openedAt != null}
                            onClick={async () => openExpirationMutation.mutateAsync(expirationInfo.expirationDate)}>Open</Button>
                        <Button color="dark"
                            onClick={async () => removeExpirationMutation.mutateAsync(expirationInfo.expirationDate)}>Trash</Button>
                    </Button.Group>
                </td>
            </tr>
        )
    })

    return (
        <Container mt={'xl'} pt={'xl'}>
            <GoBackButton />
            <Card radius={'lg'} shadow="md" padding={'md'}>
                <Flex align={"flex-start"} gap={'xl'} wrap={"wrap"}>
                    <Image
                        src={`${api_path}/images/${food.image}`}
                        height={200}
                        width={200}
                        radius={'xl'}
                    />
                    <Stack spacing={'xs'}>
                        <Group position="apart" spacing={'xl'}>
                            <Title order={1}>{food.name}</Title>
                            <FreshBadge daysToExpiration={fastestToSpoil?.daysToExpiration} />
                        </Group>
                        <Text>Items in storage: {itemsInStorage}</Text>
                        <Text>Will be spoiled in: {fastestToSpoil?.daysToExpiration} days</Text>
                    </Stack>
                </Flex>

            </Card>
            <ScrollArea>
                <Table striped mt={'xl'}>
                    <thead>
                        <tr>
                            <th>Expiration date</th>
                            <th>Days to expiration</th>
                            <th>Opened</th>
                            <th>Expiring soon</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </ScrollArea>


        </Container>
    )
}
