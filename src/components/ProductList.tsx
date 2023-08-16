import { MQuickActionButton } from '@dynamic-framework/ui-react';
import type { Product } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch } from '../store/hooks';
import { setSelectedProduct } from '../store/slice';

import useProducts from '../hooks/useProducts';
import SkeletonList from './SkeletonList';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { loading, productsToTransfer } = useProducts();
  const handleSelectProduct = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  if (loading) {
    return <SkeletonList />;
  }
  return (
    <div className="d-flex flex-column products">
      {productsToTransfer.map((product) => (
        <MQuickActionButton
          line1={product.name}
          line2={`••• ${product.productNumber.slice(-3)}`}
          key={product.id}
          representativeIcon="heart-fill"
          onClick={() => handleSelectProduct(product)}
        />
      ))}
    </div>
  );
}
