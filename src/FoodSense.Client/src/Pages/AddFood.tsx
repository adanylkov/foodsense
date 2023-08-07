import { useEffect, useState } from 'react';
import { FoodForm } from '../Components/FoodForm';
import { BarcodeScanner } from './BarcodeScanner';
import { useQuery } from '@tanstack/react-query';
import { api_path } from '../api';
import { AddExpiration } from './AddExpiration';
import { Center, Loader } from '@mantine/core';
import { useParams } from 'react-router-dom';

export const AddFood = () => {
  const [barcodeState, setBarcode] = useState('');
  const { barcode } = useParams();

  useEffect(() => {
    if (barcode !== undefined) {
      setBarcode(barcode);
    }
  }, [barcode])

  const { isLoading, isError, data } = useQuery(["food", barcodeState], {
    enabled: !!barcodeState,
    queryFn: async () => {
      const response = await fetch(`${api_path}/api/Food/${barcodeState}`);
      if (response.status === 200) {
        return await response.json();
      }
      return null;
    },
    retry: false,
  });

  if (!isLoading && data !== null && barcodeState) {
    return <AddExpiration barcode={barcodeState} />
  }
  else if (!isLoading && data === null && barcodeState) {
    return <FoodForm barcode={barcodeState} />
  }
  else if (barcodeState) {
    return (
      <Center h={'100vh'}>
        <Loader />
      </Center>
    )
  }
  return <BarcodeScanner onDetected={setBarcode} />
}
