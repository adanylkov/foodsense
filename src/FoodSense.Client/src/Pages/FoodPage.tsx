import { Container } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

export const FoodPage = () => {

    const { data, error, isLoading } = useQuery(["food"], async () => {
        const response = await fetch("https://localhost:5239/api/food")
        return response.json()
    });

    return (
        <Container>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {JSON.stringify(error)}</div>}
        {data && <div>{JSON.stringify(data)}</div>}
        </Container>
    )
}
