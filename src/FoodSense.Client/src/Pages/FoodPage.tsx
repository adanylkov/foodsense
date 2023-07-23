import { Container, Paper, SimpleGrid, Skeleton, Text } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FoodElement, FoodElementProps } from "./FoodElement";
import { api_path } from "../api";

export const FoodPage = () => {

    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery<FoodElementProps[]>(["food"], async () => {
        const response = await fetch(`${api_path}/api/Food`)
        return await response.json();
    });

    const deleteMutation = useMutation({
        mutationFn: async (barcode: string) => {
            await fetch(`${api_path}/api/Food/${barcode}`, {
                method: 'DELETE'
            });
        },
        onSuccess(data, barcode, context) {
            queryClient.setQueryData<FoodElementProps[]>(["food"], (old) => {
                console.log(barcode);
                return old?.filter(f => f.barcode !== barcode);
            });
        },
    });

    const foodElements = data?.map((f: any) => <FoodElement key={f.barcode} name={f.name}
        imageUrl={f.image}
        nutrition={f.nutrition}
        barcode={f.barcode}
        onDelete={deleteMutation.mutate}
        isLoading={deleteMutation.isLoading} />);

    const loadingSkeletons = [...Array(10)].map((_, i) =>
        <Paper key={i}>
            <Skeleton height={200} />
        </Paper>);

    return (
        <Container>
            <SimpleGrid cols={3} spacing="md" breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}>
                {isLoading && loadingSkeletons}
                {data && foodElements}
            </SimpleGrid>
        </Container>
    )
}
