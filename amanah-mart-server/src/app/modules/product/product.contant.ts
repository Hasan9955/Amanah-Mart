

interface IProduct {
    name: string;
    description: string;
    price: number;
    discountPercent?: number;
    stock: number;
    image: string;
    isFeatured?: boolean;
    isAvailable?: boolean;
    averageRatings?: number;
    purchaseCount?: number;
    brand?: string;
    expiryDate?: string;
    weight?: number;
    categoryId: string;
    shopId: string;
  }

  
  export const productSearchableFields = ['name', 'brand', 'description']

  export const productFilterableFields = [
      'name',
      'id',
      'brand',
      'searchTerm'
  ]