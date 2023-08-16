import { useEffect, useState } from 'react';

import { Product, ProductRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts } from '../store/selectors';
import { setProducts, setOriginProduct } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();
  const [productsToTransfer, setProductsToTransfer] = useState<Product[]>([]);

  useEffect(() => {
    const {
      perform,
      abort,
    } = ProductRepository.list(['checking', 'saving']);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setProducts(data));
        const urlParams = new URLSearchParams(window.location.search);
        const fromAccount = urlParams.get('from_account');
        const originProduct = data.find(({ id }) => fromAccount === id);

        const origin = fromAccount && originProduct ? originProduct : undefined;
        dispatch(setOriginProduct(origin));
        setProductsToTransfer(data.filter(({ id }) => id !== origin?.id));

        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
    products,
    productsToTransfer,
  };
}
