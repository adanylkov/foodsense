import { Button, Container, Flex, Group, NumberInput, Stack, Tabs, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export const AddFood = () => {

  const form = useForm({
    initialValues: {
      name: '',
      barcode: '',
      nutrition: {
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
        potassium: 0
      }
    },
  });

  return (
    <form onSubmit={form.onSubmit((value) => console.log(value))}>
      <Container size={'xs'} >
        <Tabs defaultValue='main' variant='pills'>
          <Tabs.List>
            <Tabs.Tab value='main'>Main information</Tabs.Tab>
            <Tabs.Tab value='nutrition'>Nutrients</Tabs.Tab>
            <Tabs.Tab value='fats'>Fats</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='main' pt={'md'}>
            <Stack>
              <Group>
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
                  {...form.getInputProps('nutrition')}
                />
              </Group>
              <Group>
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
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value='nutrition' pt={'md'}>
            <Stack>
              <Group>
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
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value='fats' pt={'md'}>
            <Stack>
              <Group>
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
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Button mt={'lg'} type='submit'>
          Submit
        </Button>

      </Container>
    </form>
  )
}
