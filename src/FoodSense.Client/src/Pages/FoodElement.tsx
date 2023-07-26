import { Card, Image, Text, Badge, Group, Accordion, Flex, Menu, ActionIcon, Loader } from '@mantine/core';
import { api_path } from '../api';
import { IconFlame, IconDroplet, IconGrowth, IconMeat, IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash, IconSalt, IconCube, IconActivityHeartbeat, IconPizza, IconCheese, IconFish } from '@tabler/icons-react';

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
                <Accordion.Panel>
                    <Flex gap={'xs'}>
                        <IconSalt />
                        <Text weight={500}>Sodium:</Text>
                        <Text>{props.sodium}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconCube />
                        <Text weight={500}>Sugar:</Text>
                        <Text>{props.sugar}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconGrowth />
                        <Text weight={500}>Fiber</Text>
                        <Text>{props.fiber}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconActivityHeartbeat />
                        <Text weight={500}>Cholesterol:</Text>
                        <Text>{props.cholesterol}</Text>
                    </Flex>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="fats">
                <Accordion.Control>Fats</Accordion.Control>
                <Accordion.Panel>
                    <Flex gap={'xs'}>
                        <IconCheese />
                        <Text weight={500}>Saturated Fat:</Text>
                        <Text>{props.saturatedFat}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconPizza />
                        <Text weight={500}>Trans Fat:</Text>
                        <Text>{props.transFat}</Text>
                    </Flex>
                    <Flex gap={'xs'}>
                        <IconFish />
                        <Text weight={500}>Unsaturated Fat:</Text>
                        <Text>{props.unsaturatedFat}</Text>
                    </Flex>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

interface ControlMenuProps {
    onDelete: (barcode: string) => void;
    barcode: string;
}

const ControlMenu = (props: ControlMenuProps) => {
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle">{<IconSettings size="1.5rem" />}</ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Controls</Menu.Label>
                <Menu.Item icon={<IconTrash size={14} color='red' />} onClick={() => props.onDelete(props.barcode)}>Delete food</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export interface FoodElementProps {
    barcode: string;
    onDelete: (barcode: string) => void;
    isLoading: boolean;
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
                { props.isLoading ? <Loader size="md" /> : <ControlMenu onDelete={props.onDelete} barcode={props.barcode} />} 
            </Group>

            <NutritionInfo {...props.nutrition} />
        </Card>
    );
}