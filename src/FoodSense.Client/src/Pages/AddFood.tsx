import { useState } from 'react';
import { FoodForm } from '../Components/FoodForm';
import { BarcodeScanner } from './BarcodeScanner';
import { useQuery } from '@tanstack/react-query';
import { api_path } from '../api';
import { AddExpiration } from './AddExpiration';
import { Center, Loader } from '@mantine/core';

export const AddFood = () => {
  const [barcode, setBarcode] = useState('');

  const { isLoading, isError, data } = useQuery(["food", barcode], {
    enabled: !!barcode,
    queryFn: async () => {
      const response = await fetch(`${api_path}/api/Food/${barcode}`);
      if (response.status === 200) {
        return await response.json();
      }
      return null;
    },
    retry: false,
  });

  if (!isLoading && data !== null && barcode) {
    return <AddExpiration barcode={barcode} />
  }
  else if (!isLoading && data === null && barcode) {
    return <FoodForm barcode={barcode} />
  }
  else if (barcode) {
    return (
      <Center h={'100vh'}>
        <Loader />
      </Center>
    )
  }
  return <BarcodeScanner onDetected={setBarcode} />
}
