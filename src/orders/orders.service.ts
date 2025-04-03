import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    getOrders(){
        return ["Order 1", "Order 2", "Order 3"];
    }
}
