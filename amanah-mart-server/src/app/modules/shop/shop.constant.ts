import { ShopStatus } from "@prisma/client";


interface IShop {
    name: string;
    logo: string;
    bannerImage?: string;
    address: string;
    contactEmail: string;
    contactPhone: string;
    vendorId: string;
    description: string;
    status: ShopStatus;
  }

export const shopSearchableFields = ['name']

export const shopFilterableFields = [
    'name', 
    'status', 
    'id',
    'searchTerm'
]
  