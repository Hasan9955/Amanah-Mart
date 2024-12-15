import { prisma } from "../../utils/prisma";
import { IOrder } from "./order.constant";



const getAllOrder = async () => {
    const result = await prisma.order.findMany()
    return result
}

const getSingleOrder = async (id: string) => {

    const result = await prisma.order.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    return result;
}

const getMyOrder = async (id: string) => {
    const result = await prisma.order.findMany({
        where: {
            customerId: id
        }
    })

    return result;
}

const getVendorOrder = async (vendorId: string) => {

    const result = await prisma.orderItem.findMany({
        where: {
            product: {
                shop: {
                    vendorId: {
                        equals: vendorId
                    }
                }
            }
        },
        include: {
            product: true 
        }
    })

    return result;
}


const createOrder = async (orderData: IOrder) => {
  const { customerId, shopId, totalAmount, couponId, status, items } = orderData;

  const result = await prisma.$transaction(async (prismaTran) => {
      
    const order = await prismaTran.order.create({
      data: {
        customerId,
        shopId,
        totalAmount,
        couponId: couponId || null,
        status,
      },
    });

    
    const orderItems = items.map((item: any) => ({
      orderId: order.id, 
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    }));

    await prismaTran.orderItem.createMany({
      data: orderItems,
    });

    return order;
  });

  return result;
};


const updateOrder = async (id: string, payload: Partial<IOrder>) => {
    await prisma.order.findUniqueOrThrow({
        where: {
            id
        }
    })

}