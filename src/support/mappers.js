const { oneTimeClient, clientTransactionQuery } = require("../pg/pool");

const ProductBodyToDb = {
  uzName: 'uz_name',
	ruName: 'ru_name',
  enName: 'en_name',
  companyId: 'company_id',
	categoryId: 'category_id',
	measure: 'measure',
	barcode: 'barcode',
	image: 'image',
	countInBlock: 'blokda_soni',
	description: 'description',
	countPrice: 'dona_price',
	blockPrice: 'blok_price',
	discountPrice: 'disc_price',
}

const OrderBodyToDb = {
  userId: 'user_id',
	status: 'status',
  quantity: 'quantity',
  totalSum: 'total_sum',
	paymentType: 'payment_type',
	inActive: 'in_active',
}

const OrderItemsBodyToDb = {
  orderId: 'order_id',
  productId: 'product_id',
  quantity: 'quantity',
  unitType: 'unit_type',
  unitPrice: 'unit_price',
}

async function BodyToDbMapper({ body, mapper, action, returning = '*' }, tableName, trx) {
  if (action === 'CREATE') {
    let filteredBody = {};
    for(key of Object.keys(body)){
      if (body[key] !== undefined && body[key] !== null) {
        filteredBody[mapper[key]] = body[key];
      }
    }
    const insertColumns = Object.keys(filteredBody).join(', ');
    const insertValues = Object.keys(filteredBody)
      .map((key, index) => `$${index + 1}`)
      .join(', ');
    
    const values = Object.values(filteredBody);

    if (values.length < 1) {
      return 200;
    }

    const query = clientTransactionQuery(trx,
      `insert into ${tableName} (${insertColumns}) values (${insertValues}) RETURNING ${returning}`,
      ...values
    );
    return query;
  }

  if (action === 'UPDATE') {
    const id = body?.id;
    delete body?.id;
    let filteredBody = {};

    for(key of Object.keys(body)){
      if (body[key] !== undefined && body[key] !== null) {
        filteredBody[mapper[key]] = body[key];
      }
    }

    const setCase = Object.keys(filteredBody)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    
    const values = Object.values(filteredBody);

    if (values.length < 1) {
      return 200;
    }
    const query = clientTransactionQuery(trx,
      `UPDATE ${tableName} SET ${setCase}, updated_at = now() WHERE id = $${values.length + 1} RETURNING ${returning}`,
      ...values, id
    );
    return query;
  }
}

module.exports = { ProductBodyToDb, BodyToDbMapper, OrderItemsBodyToDb, OrderBodyToDb }