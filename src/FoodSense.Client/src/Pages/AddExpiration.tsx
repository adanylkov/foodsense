import { useForm } from "@mantine/form"
import { Query, useMutation, useQuery } from "@tanstack/react-query";
import { Button, Center, Loader, NumberInput, Skeleton, Stack, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { api_path } from "../api";
import { FoodElementProps } from "./FoodElement";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { getTotalHoursFromTimeSpan } from "../Helpers/Date";

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

  const { data: food, isLoading, error } = useQuery(["food", props.barcode], async () => {
    const response = await fetch(`${api_path}/api/Food/${props.barcode}`)
    if (response.status === 200) {
      return await response.json() as FoodElementProps;
    }
    throw new Error("Food not found");
  });

  const form = useForm({
    initialValues: {
      foodName: '',
      expirationDate: new Date(),
      expirationFromOpened: getTotalHoursFromTimeSpan(food?.expirationFromOpened ?? '0.00:00:00'),
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
      for (let index = 0; index < form.values.quantity; index++) {
        await addExpirationMutation.mutateAsync(value);
      }
      notifications.show({
        title: 'Success',
        color: 'green',
        message: `Added expiration for ${food?.name}`,
      });
      navigate('/');
    })}>
      <Center>
        <Stack>
          <Title align="center">{food?.name}</Title>
          <DateInput label="Expiration date" required {...form.getInputProps('expirationDate')} disabled={isLoading} />
          <NumberInput label="Expiration Time (Hours After Opening)" required {...form.getInputProps('expirationFromOpened')} disabled={isLoading} />
          <NumberInput label="Quantity" required {...form.getInputProps('quantity')} disabled={isLoading} />
          <Button type="submit" loading={addExpirationMutation.isLoading || isLoading}>Add</Button>
        </Stack>
      </Center>
    </form>
  )
}
