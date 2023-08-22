import { useForm } from "@mantine/form"
import { Query, useMutation, useQuery } from "@tanstack/react-query";
import { Button, Center, Loader, NumberInput, Skeleton, Stack, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { api_path } from "../api";
import { FoodElementProps } from "./FoodElement";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

interface AddExpirationProps {
  barcode: string
}

interface AddExpirationFormProps {
  foodName: string;
  expirationDate: Date;
  expirationFromOpened: number;
}


export const AddExpiration = (props: AddExpirationProps) => {

  const navigate = useNavigate();

  const { data: foodName, isLoading, error } = useQuery<string>(["food", props.barcode, "name"], async () => {
    const response = await fetch(`${api_path}/api/Food/${props.barcode}`)
    if (response.status === 200) {
      return (await response.json() as FoodElementProps)?.name;
    }
    throw new Error("Food not found");
  });

  const form = useForm({
    initialValues: {
      foodName: '',
      expirationDate: new Date(),
      expirationFromOpened: 0,
      quantity: 1,
    },
    validate: {
      expirationFromOpened: (value) => value <= 0 ? 'Expiration time must be greater than 0' : null,
      quantity: (value) => value <= 0 ? 'Quantity must be greater than 0' : null,
    }
  });

  const addExpirationMutation = useMutation({
    mutationFn: async (value: AddExpirationFormProps) => {
      await fetch(`${api_path}/api/Food/${props.barcode}/items`, {
        method: 'POST',
        body: JSON.stringify({
          expirationDate: value.expirationDate,
          expirationFromOpened: value.expirationFromOpened,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  });

  return (
    <form onSubmit={form.onSubmit(async (value) => {
      await addExpirationMutation.mutateAsync(value);
      notifications.show({
        title: 'Success',
        color: 'green',
        message: `Added expiration for ${foodName}`,
      });
      navigate('/');
    })}>
      <Center>
        <Stack>
          <Title align="center">{foodName}</Title>
          <DateInput label="Expiration date" required {...form.getInputProps('expirationDate')} disabled={isLoading} />
          <NumberInput label="Expiration Time (Hours After Opening)" required {...form.getInputProps('expirationFromOpened')} disabled={isLoading}  />
          <NumberInput label="Quantity" required {...form.getInputProps('quantity')} disabled={isLoading} />
          <Button type="submit" loading={addExpirationMutation.isLoading || isLoading}>Add</Button>
        </Stack>
      </Center>
    </form>
  )
}
