import TProduct from '../types/product';
import TStatus from '../types/status';
import productsModel from '../models/products.model';

const set = async ({ name, amount }: TProduct): Promise<TStatus> => {
  const [product]: TProduct[] = await productsModel.set({ name, amount, orderId: null });

  return { status: null, message: product };
};

const getAll = async (): Promise<TStatus> => {
  const products: TProduct[] = await productsModel.getAll();

  return { status: null, message: products };
};

export default {
  set,
  getAll,
};
