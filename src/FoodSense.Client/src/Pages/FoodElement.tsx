import { Card, Image, Text, Badge, Group, Accordion, Flex, Menu, ActionIcon } from '@mantine/core';
import { api_path } from '../api';
import { IconFlame, IconDroplet, IconGrowth, IconMeat, IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash } from '@tabler/icons-react';

interface NutritionInfoProps {
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

const NutritionInfo = (props: NutritionInfoProps) => {
    return (
        <Accordion variant='filled' radius={'md'}>
            <Accordion.Item value="macronutrients">
                <Accordion.Control>Macronutrients</Accordion.Control>
                <Accordion.Panel>
                    <Flex gap={'xs'}>
                        <IconFlame />
                        <Text weight={500}>Calories:</Text>
                        <Text>{props.calories}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconDroplet />
                        <Text weight={500}>Fat:</Text>
                        <Text>{props.fat}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconGrowth />
                        <Text weight={500}>Carbohydrates:</Text>
                        <Text>{props.carbohydrates}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconMeat />
                        <Text weight={500}>Proteins:</Text>
                        <Text>{props.protein}</Text>
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
    )
}

const ControlMenu = () => {
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle"><IconSettings size="1.5rem" /></ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Controls</Menu.Label>
                <Menu.Item icon={<IconTrash size={14} color='red' />}>Delete food</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
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
                    height={200}
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.name}</Text>
                <ControlMenu />
            </Group>

            <NutritionInfo {...props.nutrition} />
        </Card>
    );
}