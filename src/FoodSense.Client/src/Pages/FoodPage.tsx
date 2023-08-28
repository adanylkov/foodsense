import { Container, Paper, SimpleGrid, Skeleton, Tabs } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FoodElement, FoodElementProps } from "./FoodElement";
import { api_path } from "../api";
import { FloatingButton } from "../Components/FloatingButton";
import { IconFridge, IconLayout2 } from "@tabler/icons-react";

export const FoodPage = () => {





    return (
        <>
            <Tabs variant="pills" defaultValue="all">
                <Tabs.List position="center" mb={'lg'}>
                    <Tabs.Tab value="all" icon={<IconLayout2 />}>All food types</Tabs.Tab>
                    <Tabs.Tab value="storage" icon={<IconFridge size="0.8rem" />}>In storage</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="all" pt="xs">
                    <FoodGrid />
                </Tabs.Panel>

                <Tabs.Panel value="storage" pt="xs">
                    <FoodGrid showOnlyInStorage={true} />
                </Tabs.Panel>
            </Tabs>
            <FloatingButton />

        </>
    );
}

const LoadingSkeletons = () => {
    return (
        <>
            {
                [...Array(10)].map((_, i) =>
                    <Paper key={i}>
                        <Skeleton height={200} />
                    </Paper>)
            }
        </>
    )
}

interface FoodGridProps {
    showOnlyInStorage?: boolean;
}

const FoodGrid = (props: FoodGridProps) => {

    const queryKey = props.showOnlyInStorage ? ["food", "storage"] : ["food"];
    const queryUrl = props.showOnlyInStorage ? `${api_path}/api/Food?inStorage=true` : `${api_path}/api/Food`

    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery<FoodElementProps[]>(queryKey, async () => {
        const response = await fetch(queryUrl)
        return await response.json();
    });

    const deleteMutation = useMutation({
        mutationFn: async (barcode: string) => {
            await fetch(`${api_path}/api/Food/${barcode}`, {
                method: 'DELETE'
            });
        },
        onSuccess(data, barcode, context) {
            queryClient.setQueryData<FoodElementProps[]>(queryKey, (old) => {
                return old?.filter(f => f.barcode !== barcode);
            });
        },
    });


    const foodElements = data?.map((f: any) => <FoodElement key={f.barcode} name={f.name}
        image={f.image}
        nutrition={f.nutrition}
        barcode={f.barcode}
        onDelete={deleteMutation.mutate}
        isLoading={isLoading}
        expirationFromOpened={f.expirationFromOpened}
        expirationInfos={f.expirationInfos}
        showExpirationInfo={props.showOnlyInStorage ?? false}/>);

    return (
        <Container>
            <SimpleGrid cols={3} spacing="md" breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}>
                {isLoading && <LoadingSkeletons />}
                {foodElements !== undefined && foodElements}
            </SimpleGrid>
        </Container>
    )
}