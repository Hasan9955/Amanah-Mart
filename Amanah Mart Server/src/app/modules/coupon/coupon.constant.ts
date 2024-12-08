

export interface ICoupon {
    code: string;
    description?: string;
    discount: number;
    minSpend?: number;
    expiresAt: string;  
    isActive?: boolean;
    createdBy: 'ADMIN' | 'VENDOR';
    shopId?: string;
    usageLimit?: number;
  }
  