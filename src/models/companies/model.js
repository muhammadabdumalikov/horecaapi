module.exports.ALL = `
with counts as (
	select count(id) 
	from companies c
	where concat(c.uz_name, c.ru_name, c.en_name) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(c.uz_name, c.ru_name, c.en_name)
		end
), a as (
	select
	array (
		select
			jsonb_build_object (
					'number', row_number() OVER (order by c.id),
					'id', c.id,
					'uz_name', c.uz_name,
					'ru_name', c.ru_name,
					'en_name', c.en_name,
					'uz_country', c.uz_country,
					'ru_country', c.ru_country,
					'en_country', c.en_country,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(c.updated_at, 'hh24:mi / dd.mm.yy')
				)
		from companies c
			where concat(c.uz_name, c.ru_name, c.en_name) ilike
			case
				when $1::text <> '%""%'::text then $1
				else concat(c.uz_name, c.ru_name, c.en_name)
			end
			order by c.id
			limit 40 offset $2
	) list,
	jsonb_build_object(
		'count', c.count,
		'pages', case
					when c.count = 0 then 0
					when c.count < 41 then 1
					when (mod(c.count, 40)) >= 1 then ((c.count / 40) + 1)
					else (c.count / 40)
				end,
		'page', case
					when c.count = 0 then 0
					else $2 / 40 + 1
				end 
	) more_info
from counts c
) select
	more_info,
	list
from a;
`;

module.exports.CREATE = `
insert into companies (uz_name, ru_name, en_name, uz_country, ru_country, en_country)
values($1, $2, $3, $4, $5, $6) returning id
`;

module.exports.UPDATE = `
update companies
set
	uz_name = $1,
	ru_name = $2,
	en_name = $3,
	uz_country = $4,
	ru_country = $5,
	en_country = $6,
	updated_at = now()
where id = $7
returning id	
`;

module.exports.INACTIVE = `
update companies
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
