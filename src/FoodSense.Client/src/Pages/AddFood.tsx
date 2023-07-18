import { useState } from 'react';
import { FoodForm } from '../Components/FoodForm';
import { BarcodeScanner } from './BarcodeScanner';

export const AddFood = () => {

  const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');

  const onDetected = (result: string) => {
    setShowScanner(false);
    setBarcode(result);
  }

  return showScanner ? <BarcodeScanner onDetected={onDetected} /> : <FoodForm barcode={barcode} />
}
