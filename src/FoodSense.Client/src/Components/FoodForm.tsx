import { Button, Center, Container, FileButton, Flex, Grid, Group, NumberInput, SimpleGrid, Stack, Tabs, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React from 'react'
import { api_path } from '../api';

interface FoodFormElementProps {
    barcode: string;
}

interface FoodFormProps {
    name: string;
    barcode: number;
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
    sodium: number;
    sugar: number;
    fiber: number;
    cholesterol: number;
    saturatedFat: number;
    transFat: number;
    unsaturatedFat: number;
    potassium: number;
    image: File;
}

export const FoodForm = (props: FoodFormElementProps) => {

    const form = useForm({
        initialValues: {
            name: '',
            barcode: parseInt(props.barcode),
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0,
            sodium: 0,
            sugar: 0,
            fiber: 0,
            cholesterol: 0,
            saturatedFat: 0,
            transFat: 0,
            unsaturatedFat: 0,
            potassium: 0,
            image: new File([], '')
        },
    });

    const sendNotification = (status: number, message: string) => {
        notifications.show({
            title: status === 200 ? 'Success' : 'Error',
            color: status === 200 ? 'green' : 'red',
            message: status === 200 ? 'Food type added successfully' : message,
        });
    };

    const handleFormSubmit = async (value: FoodFormProps) => {
        var formData = new FormData();
        formData.append('Image', value.image);
        formData.append('Name', value.name);
        formData.append('Barcode', value.barcode.toString());
        formData.append('Nutrition.Calories', value.calories.toString());
        formData.append('Nutrition.Fat', value.fat.toString());

        const response = await fetch(`${api_path}/api/Food`, {
            method: 'POST',
            body: formData,
        });

        sendNotification(response.status, await response.text());
    }
    return (
        <form onSubmit={form.onSubmit((value) => handleFormSubmit(value))}>
            <Container>
                <Tabs defaultValue='main' variant='pills'>
                    <Tabs.List>
                        <Tabs.Tab value='main'>Main information</Tabs.Tab>
                        <Tabs.Tab value='nutrition'>Nutrients</Tabs.Tab>
                        <Tabs.Tab value='fats'>Fats</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value='main' pt={'md'}>
                        <SimpleGrid cols={3} breakpoints={
                            [
                                { maxWidth: 'sm', cols: 1 },
                            ]
                        }>
                            <TextInput
                                placeholder='e.g. Banana'
                                label='Food name'
                                withAsterisk
                                required
                                {...form.getInputProps('name')}
                            />
                            <NumberInput
                                label='Barcode'
                                hideControls={true}
                                withAsterisk
                                required
                                {...form.getInputProps('barcode')}
                            />
                            <NumberInput
                                label='Calories'
                                hideControls={true}
                                withAsterisk
                                required
                                {...form.getInputProps('calories')}
                            />
                            <NumberInput
                                label='Fat'
                                hideControls={true}
                                withAsterisk
                                required
                                {...form.getInputProps('fat')}
                            />
                            <NumberInput
                                label='Carbohydrates'
                                hideControls={true}
                                withAsterisk
                                required
                                {...form.getInputProps('carbohydrates')}
                            />
                            <NumberInput
                                label='Protein'
                                hideControls={true}
                                withAsterisk
                                required
                                {...form.getInputProps('protein')}
                            />
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value='nutrition' pt={'md'}>
                        <SimpleGrid cols={3} breakpoints={
                            [
                                { maxWidth: 'sm', cols: 1 },
                            ]
                        }>
                            <NumberInput
                                label='Sodium'
                                hideControls={true}
                                {...form.getInputProps('sodium')}
                            />
                            <NumberInput
                                label='Sugar'
                                hideControls={true}
                                {...form.getInputProps('sugar')}
                            />
                            <NumberInput
                                label='Fiber'
                                hideControls={true}
                                {...form.getInputProps('fiber')}
                            />
                            <NumberInput
                                label='Cholesterol'
                                hideControls={true}
                                {...form.getInputProps('cholesterol')}
                            />
                            <NumberInput
                                label='Potassium'
                                hideControls={true}
                                {...form.getInputProps('potassium')}
                            />
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value='fats' pt={'md'}>
                        <SimpleGrid cols={3} breakpoints={
                            [
                                { maxWidth: 'sm', cols: 1 },
                            ]
                        }>
                            <NumberInput
                                label='Saturated fat'
                                hideControls={true}
                                {...form.getInputProps('saturatedFat')}
                            />
                            <NumberInput
                                label='Trans fat'
                                hideControls={true}
                                {...form.getInputProps('transFat')}
                            />
                            <NumberInput
                                label='Unsaturated fat'
                                hideControls={true}
                                {...form.getInputProps('unsaturatedFat')}
                            />
                        </SimpleGrid>
                    </Tabs.Panel>
                </Tabs>

                <Flex mt={'xl'} justify={'space-between'} gap={'lg'}>
                    <FileButton onChange={(file) => file !== null ? form.setFieldValue('image', file) : form.setFieldError('image', "Image can't be null")} accept="image/png,image/jpeg">
                        {(props) => <Button {...props}>Upload image</Button>}
                    </FileButton>
                    <Button type='submit' disabled={form.values['image'].size == 0}>
                        Submit
                    </Button>
                </Flex>



            </Container>
        </form>
    )
}
