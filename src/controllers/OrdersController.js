import OrdersService from "../services/Orders.js";

class OrderController {
  constructor() {
    this.service = new OrdersService();
  }

  getOrders = async (req, res) => {
    try {
      const orders = await this.service.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  saveOrder = async (req, res) => {
    try {
      const data = {
        cartId: req.params.cartId,
        email: req.body.email ?? req.user.email,
      };

      const result = await this.service.saveOrder(data);
      res.status(201).json({
        status: 201,
        description: "La orden de compra fue creada.",
        order: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };
}

export default OrderController;
