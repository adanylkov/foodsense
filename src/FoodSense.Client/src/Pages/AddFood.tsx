import { useState } from 'react';
import { FoodForm } from '../Components/FoodForm';
import { BarcodeScanner } from './BarcodeScanner';
import { useQuery } from '@tanstack/react-query';
import { api_path } from '../api';
import { AddExpiration } from './AddExpiration';
import { Center, Loader } from '@mantine/core';

export const AddFood = () => {

  const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');

  const onDetected = (result: string) => {
    setShowScanner(false);
    setBarcode(result);
  }

  const { isLoading, isError } = useQuery(["food", barcode], {
    enabled: !!barcode,
    queryFn: async () => {
      const response = await fetch(`${api_path}/api/Food/${barcode}`);
      return await response.json();
    }
  });

  if (!isLoading && !isError && barcode) {
    return <AddExpiration barcode={barcode} />
  }
  else if (!isLoading && isError && barcode) {
    return <FoodForm barcode={barcode} />
  }
  else if (isLoading && barcode) {
    return (
      <Center h={'100vh'}>
        <Loader />
      </Center>
    )
  }
  return <BarcodeScanner onDetected={onDetected} />
}
