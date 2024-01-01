module.exports.ALL = `
with counts as (
	select count(id) 
	from products p
	where concat(p.uz_name, p.ru_name, p.en_name) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(p.uz_name, p.ru_name, p.en_name)
		end
), a as (
	select
	array (
		select
			jsonb_build_object (
					'number', row_number() OVER (order by p.id),
					'id', p.id,
					'uz_name', p.uz_name,
					'ru_name', p.ru_name,
					'en_name', p.en_name,
					'company_id', p.company_id,
					'categpry_id', p.category_id,
					'image', p.image,
					'barcode', p.barcode,
					'description', p.description,
					'count_price', p.dona_price,
					'block_price', p.blok_price,
					'discount_price', p.disc_price,
					'count_in_block', p.blokda_soni,
					'in_active', p.in_active,
					'created_at', to_char(p.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(p.updated_at, 'hh24:mi / dd.mm.yy')
				)
		from products p
			where concat(p.uz_name, p.ru_name, p.en_name) ilike
			case
				when $1::text <> '%""%'::text then $1
				else concat(p.uz_name, p.ru_name, p.en_name)
			end
			order by p.id
			limit 40 offset $2
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
					else $2 / 40 + 1
				end 
	) more_info
from counts p
) select
	more_info,
	list
from a;
`;

module.exports.CREATE = `
insert into products (company_id, category_id, uz_name, ru_name, en_name, measure, barcode, image, blokda_soni, description, dona_price, blok_price, disc_price)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning id
`;

module.exports.UPDATE = `
update products
set
	company_id = $1,
	category_id = $2,
	uz_name = $3,
	ru_name = $4,
	en_name = $5,
	measure = $6,
	barcode = $7,
	image = $8,
	blokda_soni = $9,
	description = $10,
	dona_price = $11,
	blok_price = $12,
	disc_price = $13,
	updated_at = now()
where id = $14
returning id	
`;

module.exports.INACTIVE = `
update products
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
