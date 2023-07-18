import { Card, Image, Text, Badge, Group, Accordion, Flex } from '@mantine/core';
import { api_path } from '../api';

interface FoodElementProps {
    name: string;
    imageUrl: string;
    nutrition: {
        calories: number;
        fat: number;
        carbohydrates: number,
        protein: number,
        sodium: number,
        sugar: number,
        fiber: number,
        cholesterol: number,
        saturatedFat: number,
        transFat: number,
        unsaturatedFat: number,
        potassium: number,
    }
}

export const FoodElement = (props: FoodElementProps) => {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={`${api_path}/images/${props.imageUrl}`}
                    height={160}
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.name}</Text>
                <Badge color="pink" variant="light">
                    On Sale
                </Badge>
            </Group>

            <Accordion>
                <Accordion.Item value="macronutrients">
                    <Accordion.Control>Macronutrients</Accordion.Control>
                    <Accordion.Panel>
                        <Flex gap={'xs'}>
                            <Text weight={500}>Calories:</Text>
                            <Text>{props.nutrition.calories}</Text>
                        </Flex>
                        <Flex gap={'xs'}>
                            <Text weight={500}>Fat:</Text>
                            <Text>{props.nutrition.fat}</Text>
                        </Flex>
                        <Flex gap={'xs'}>
                            <Text weight={500}>Carbohydrates:</Text>
                            <Text>{props.nutrition.carbohydrates}</Text>
                        </Flex>
                        <Flex gap={'xs'}>
                            <Text weight={500}>Proteins:</Text>
                            <Text>{props.nutrition.protein}</Text>
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="micronutrients">
                    <Accordion.Control>Micronutrients</Accordion.Control>
                    <Accordion.Panel>TODO</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="other">
                    <Accordion.Control>Other</Accordion.Control>
                    <Accordion.Panel>TODO</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
}