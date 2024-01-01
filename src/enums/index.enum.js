const OrderStatus = {
  cancelled: 0,
  accepted: 1,
  in_process: 2,
  delivered: 3
}

const PaymentTypes = {
  cash: 1,
  money_transfer: 2,
  debt: 3
}

const ProductUnit = {
  piece: 1,
  kg: 2
}

module.exports = { OrderStatus, PaymentTypes, ProductUnit }
