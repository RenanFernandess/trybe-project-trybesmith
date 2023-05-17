import ordersModels from '../models/orders.models';
import TOrder from '../types/order';
import TStatus from '../types/status';

const getAll = async (): Promise<TStatus> => {
  const orders: TOrder[] = await ordersModels.getAll();

  return { status: null, message: orders };
};

const set = async ({ userId, productsIds }: TOrder) => {
  if (!productsIds) return { status: 400, message: '"productsIds" is required' };
  if (!Array.isArray(productsIds)) {
    return { status: 422, message: '"productsIds" must be an array' };
  }
  if (!productsIds.length) { 
    return { status: 422, message: '"productsIds" must include only numbers' }; 
  }

  await ordersModels.set({ userId, productsIds });
  return { status: null, message: { userId, productsIds } };
};

export default {
  getAll,
  set,
};
