export interface INotification {
    id: string; 
    userId: string; 
    title: string; 
    message: string; 
    isRead?: boolean; 
    redirectTo?: string; 
    createdAt?: Date; 
  }
  