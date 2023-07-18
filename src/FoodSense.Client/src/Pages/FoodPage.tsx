import { Container, SimpleGrid } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { FoodElement } from "./FoodElement";

export const FoodPage = () => {

    const { data, error, isLoading } = useQuery(["food"], async () => {
        const response = await fetch("http://localhost:5239/api/Food")
        return response.json()
    });

    const foodElements = data?.map((f: any) => <FoodElement key={f.barcode} name={f.name}
        imageUrl={f.image}
        nutrition={f.nutrition} />);

    return (
        <Container>
            <SimpleGrid cols={3} spacing="md" breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}>
                {isLoading && <div>Loading...</div>}
                {data && foodElements}
            </SimpleGrid>
        </Container>
    )
}
