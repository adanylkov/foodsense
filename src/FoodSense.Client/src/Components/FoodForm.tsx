import { Button, Center, Container, FileButton, Flex, Grid, Group, Loader, NumberInput, SimpleGrid, Stack, Tabs, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React from 'react'
import { api_path } from '../api';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ConfirmationModal } from './ConfirmationModal';

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

    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
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

    const { data, isLoading } = useQuery(["openfoodfacts", props.barcode], async () => {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${props.barcode}.json`);
        return await response.json();
    });

    if (!isLoading && data !== null && data.status === 1 && showModal === false && !form.isDirty()) {
        setShowModal(true);
    }
    const fillValues = () => {
        setShowModal(false);
        form.setValues({
            name: data.product.product_name || '',
            calories: data.product.nutriments.energy_kcal_value || 0,
            fat: data.product.nutriments.fat_value || 0,
            carbohydrates: data.product.nutriments.carbohydrates_value || 0,
            protein: data.product.nutriments.proteins_value || 0,
            sodium: data.product.nutriments.sodium_value || 0,
            sugar: data.product.nutriments.sugars_value || 0,
            fiber: data.product.nutriments.fiber_value || 0,
            cholesterol: data.product.nutriments.cholesterol_value || 0,
            saturatedFat: data.product.nutriments["saturated-fat_value"] || 0,
        })
    }
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
        formData.append('Nutrition.Calories', value.calories.toString().replace('.', ','));
        formData.append('Nutrition.Fat', value.fat.toString().replace('.', ','));
        formData.append('Nutrition.Carbohydrates', value.carbohydrates.toString().replace('.', ','));
        formData.append('Nutrition.Protein', value.protein.toString().replace('.', ','));
        formData.append('Nutrition.Sodium', value.sodium.toString().replace('.', ','));
        formData.append('Nutrition.Sugar', value.sugar.toString().replace('.', ','));
        formData.append('Nutrition.Fiber', value.fiber.toString().replace('.', ','));
        formData.append('Nutrition.Cholesterol', value.cholesterol.toString().replace('.', ','));
        formData.append('Nutrition.SaturatedFat', value.saturatedFat.toString().replace('.', ','));

        const response = await fetch(`${api_path}/api/Food`, {
            method: 'POST',
            body: formData,
        });

        sendNotification(response.status, await response.text());
        navigate('/');
    }
    return (
        <>
            <ConfirmationModal
                title='Food founded'
                body='Food with this barcode founded on external api, do you want to auto-fill values?'
                show={showModal}
                setShow={setShowModal}
                onConfirm={fillValues} />
            <form onSubmit={form.onSubmit((value) => handleFormSubmit(value))}>
                {isLoading ? <Center h={'100vh'}>
                    <Loader size={'lg'} />
                </Center> :
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
                                        precision={2}
                                        required
                                        {...form.getInputProps('calories')}
                                    />
                                    <NumberInput
                                        label='Fat'
                                        hideControls={true}
                                        withAsterisk
                                        precision={2}
                                        required
                                        {...form.getInputProps('fat')}
                                    />
                                    <NumberInput
                                        label='Carbohydrates'
                                        hideControls={true}
                                        withAsterisk
                                        precision={2}
                                        required
                                        {...form.getInputProps('carbohydrates')}
                                    />
                                    <NumberInput
                                        label='Protein'
                                        hideControls={true}
                                        withAsterisk
                                        precision={2}
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
                                        precision={2}
                                        {...form.getInputProps('sodium')}
                                    />
                                    <NumberInput
                                        label='Sugar'
                                        hideControls={true}
                                        precision={2}
                                        {...form.getInputProps('sugar')}
                                    />
                                    <NumberInput
                                        label='Fiber'
                                        hideControls={true}
                                        precision={2}
                                        {...form.getInputProps('fiber')}
                                    />
                                    <NumberInput
                                        label='Cholesterol'
                                        hideControls={true}
                                        precision={2}
                                        {...form.getInputProps('cholesterol')}
                                    />
                                    <NumberInput
                                        label='Potassium'
                                        hideControls={true}
                                        precision={2}
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
                                        precision={2}
                                        {...form.getInputProps('saturatedFat')}
                                    />
                                    <NumberInput
                                        label='Trans fat'
                                        hideControls={true}
                                        precision={2}
                                        {...form.getInputProps('transFat')}
                                    />
                                    <NumberInput
                                        label='Unsaturated fat'
                                        hideControls={true}
                                        precision={2}
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
                    </Container>}
            </form>
        </>
    )
}
