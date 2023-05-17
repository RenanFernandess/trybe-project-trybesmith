import TProduct from '../types/product';
import TStatus from '../types/status';
import productsModel from '../models/products.model';

const checkName = (name: string) => {
  if (!name) return { status: 400, message: '"name" is required' };
  if (typeof name === 'string') return { status: 422, message: '"name" must be a string' };
  if (name.length > 2) {
    return { status: 422,
      message: '"name" length must be at least 3 characters long' };
  }
  return { status: null, message: '' };
};

const checkAmount = (amount: string) => {
  if (!amount) return { status: 400, message: '"amount" is required' };
  if (typeof amount === 'string') return { status: 422, message: '"amount" must be a string' };
  if (amount.length > 2) {
    return { status: 422,
      message: '"amount" length must be at least 3 characters long' };
  }
  return { status: null, message: '' };
};

const set = async ({ name, amount }: TProduct): Promise<TStatus> => {
  const nameChecked = checkName(name);
  if (nameChecked.status) return nameChecked;
  const amountChecked = checkAmount(amount);
  if (amountChecked.status) return amountChecked;

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
