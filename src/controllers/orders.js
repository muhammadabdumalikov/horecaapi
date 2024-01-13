const { ProductUnit, OrderStatus, PaymentTypes } = require("../enums/index.enum");
const OrderModel = require("../models/orders");
const { clientTransaction } = require("../pg/pool");
const { BodyToDbMapper, ProductBodyToDb, OrderBodyToDb, OrderItemsBodyToDb } = require("../support/mappers");
const ProductModel = require("../models/products");


module.exports.all = async (req, res) => {
	try {
		const { page } = req?.query;
		const data = await OrderModel.all(page);
		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(200).json({
				error: false,
				data,
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.add = async (req, res) => {
  try {
    const { paymentType, items } = req?.body;

		let data;
		await clientTransaction(async (trx) => {
      const order = await BodyToDbMapper({
        body: {
          userId: req.user?.id || 1,
          status: OrderStatus.accepted,
          paymentType: paymentType,
        }, mapper: OrderBodyToDb, action: 'CREATE'
			}, 'orders', trx);
			const product = await ProductModel.getOneTransaction(items[0].productId, trx);

			const orderItems = [];
			for (const item of items) {
				let priceForItem = product.disc_price ? product.disc_price : product.dona_price;

				if (item.quantity >= product.blokda_soni && +product.blok_price < priceForItem) {
					priceForItem = +product.blok_price;
				}

				orderItems.push(BodyToDbMapper({
					body: {
          	orderId: order[0]?.id,
          	productId: item.productId,
          	quantity: item.quantity,
						unitPrice: priceForItem,
        	}, action: 'CREATE', mapper: OrderItemsBodyToDb }, 'order_items', trx)
        )
			}

			const orderItemResult = await Promise.all(orderItems);

			const totalSumOfOrder = orderItemResult.reduce((a, curr) => a + Number(curr[0].unit_price), 0);

			const orderUpdate = await BodyToDbMapper({
        body: {
          quantity: orderItemResult.length,
					totalSum: totalSumOfOrder,
					id: order[0].id
        }, mapper: OrderBodyToDb, action: 'UPDATE'
			}, 'orders', trx);

			if (!orderUpdate[0]) throw new Error();

			data = orderUpdate[0];
			return orderUpdate;
		})
			.then((result) => {
    })
    .catch((error) => {
			console.error('Transaction failed:', error);
			throw new Error();
		});
		
		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(201).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.inActive = async (req, res) => {
	try {
		const { id } = req?.query;

		const data = await OrderModel.inActive(id);

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(202).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};

module.exports.getOwnOrders = async (req, res) => {
	try {
		const { page, limit, active } = req?.query;
		const { id } = req?.user;

		const data = await OrderModel.getOwnOrders({userId: id, page, limit, active});

		if (!data) {
			res.status(401).json({
				error: true,
				message: `Ma'lumotlar topilmadi`,
			});
			return;
		} else if (data?.severity) {
			res.status(409).json({
				error: true,
				message: `Bazaviy xatolik ${String(data)}`,
			});
			return;
		} else {
			res.status(202).json({
				error: false,
				data,
				message: "Muvaffaqiyatli bajarildi",
			});
			return;
		}
	} catch (e) {
		res.status(500).json({
			error: true,
			message: `Server xatolik: ${String(e)}`,
		});
		return;
	}
};
