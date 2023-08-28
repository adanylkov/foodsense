import { Card, Image, Text, Badge, Group, Accordion, Flex, Menu, ActionIcon, Loader, Stack, List } from '@mantine/core';
import { api_path } from '../api';
import { IconFlame, IconDroplet, IconGrowth, IconMeat, IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash, IconSalt, IconCube, IconActivityHeartbeat, IconPizza, IconCheese, IconFish, IconPlus } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { FreshBadge } from '../Components/FreshBadge';

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

const ExpirationInfo = (props: { expirations: ExpirationInfo[] }) => {
    const itemsNumber = props.expirations.length;
    const isExpired = props.expirations.some(x => x.isExpired);
    const freshUntilInfos = props.expirations.map(x => <List.Item> {new Date(x.expirationDate).toLocaleDateString()} ({x.daysToExpiration} days)</List.Item>);
    const fastestToSpoil = props.expirations.sort((a, b) => a.daysToExpiration - b.daysToExpiration).at(0)?.daysToExpiration;

    return (
        <>
            <Accordion variant='filled' radius={'md'}>
                <Accordion.Item value="expiration">
                    <Accordion.Control>
                        <Group position='apart'>
                            <Text>Expiration info</Text>
                            <FreshBadge daysToExpiration={fastestToSpoil} />
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text>Total items: {itemsNumber}</Text>
                        <List>
                            {freshUntilInfos}
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>);
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
    const navigate = useNavigate();
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="subtle">{<IconSettings size="1.5rem" />}</ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Controls</Menu.Label>
                <Menu.Item icon={<IconTrash size={14} color='red' />} onClick={() => props.onDelete(props.barcode)}>Delete food</Menu.Item>
                <Menu.Item icon={<IconPlus size={14} color='blue' />} onClick={() => navigate(`/add/${props.barcode}`)}>Add to storage</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export interface ExpirationInfo {
    daysToExpiration: number;
    isExpired: boolean;
    isExpiringSoon: boolean;
    expirationDate: string;
    openedAt: string | null;
    expirationFromOpened: Date;
}
export interface FoodElementProps {
    barcode: string;
    onDelete: (barcode: string) => void;
    isLoading: boolean;
    name: string;
    image: string;
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
    expirationFromOpened: string;
    expirationInfos: ExpirationInfo[];
    showExpirationInfo: boolean;
}

export const FoodElement = (props: FoodElementProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Link to={`/expiration/${props.barcode}`}>
                    <Image
                        src={`${api_path}/images/${props.image}`}
                        height={200}
                    />
                </Link>
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.name}</Text>
                {props.isLoading ? <Loader size="md" /> : <ControlMenu onDelete={props.onDelete} barcode={props.barcode} />}
            </Group>

            <NutritionInfo {...props.nutrition} />
            {props.showExpirationInfo && <ExpirationInfo expirations={props.expirationInfos} />}
        </Card>
    );
}