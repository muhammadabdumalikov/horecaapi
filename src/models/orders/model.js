module.exports.ALL = `
with counts as (select count(id)
                from orders),
     a as (select array(
                          select jsonb_build_object(
                                         'number', row_number() OVER (order by o.id),
                                         'id', o.id,
                                         'typeOfProducts', count(oi.id),
                                         'sum', o.total_sum,
                                         'paymentType', o.payment_type,
                                         'createdAt', to_char(o.created_at, 'hh24:mi / dd.mm.yy'),
                                         'updatedAt', to_char(o.updated_at, 'hh24:mi / dd.mm.yy')
                                     )
                          from orders o
                                   join order_items oi on o.id = oi.order_id
                          where o.in_active is true
                          group by o.id
                          order by o.id
                          limit 40 offset $1
                      ) list,
                  jsonb_build_object(
                          'count', p.count,
                          'pages', case
                                       when p.count = 0 then 0
                                       when p.count < 41 then 1
                                       when (mod(p.count, 40)) >= 1 then ((p.count / 40) + 1)
                                       else (p.count / 40)
                              end,
                          'page', case
                                      when p.count = 0 then 0
                                      else $1 / 40 + 1
                              end
                      ) more_info
           from counts p)
select more_info,
       list
from a;
`;

module.exports.INACTIVE = `
update orders
set
	in_active =
		case
			when in_active = true then false
			when in_active = false then true
		end,
	updated_at = now()
	where id = $1
returning id, in_active
`;

module.exports.GET_ONE = `
select * from orders
	where id = $1 limit 1
`;

