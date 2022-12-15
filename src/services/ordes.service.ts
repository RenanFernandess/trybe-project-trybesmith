import ordersModels from '../models/orders.models';
import TOrder from '../types/order';
import TStatus from '../types/status';

const getAll = async (): Promise<TStatus> => {
  const orders: TOrder[] = await ordersModels.getAll();

  return { status: null, message: orders };
};

export default {
  getAll,
};
