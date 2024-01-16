module.exports.ALL = `
with counts as (
	select count(id) 
	from users c
	where concat(c.organization, c.legal_name, contact) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(c.organization, c.legal_name, contact)
		end
		and c.in_active = case when $3::bool is not null then $3::bool else c.in_active end
), a as (
	select
	array (
		select
			jsonb_build_object (
					'number', row_number() OVER (order by c.id),
					'id', c.id,
					'fullname', c.fullname,
					'contact', c.contact,
					'organization', c.organization,
					'legal_name', c.legal_name,
					'location', c.location,
					'address', c.address,
					'is_verify', c.is_verify,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(c.updated_at, 'hh24:mi / dd.mm.yy')
				)
		where concat(c.organization, c.legal_name, contact) ilike
			case
				when $1::text <> '%""%' then $1
				else concat(c.organization, c.legal_name, contact)
			end
			and c.in_active = case when $3::bool is not null then $3::bool else c.in_active end
			order by c.id
			limit $4 offset $2
	) list,
	jsonb_build_object(
		'count', c.count,
		'pages', case
					when c.count = 0 then 0
					when c.count < $4 then 1
					when (mod(c.count, $4)) >= 1 then ((c.count / $4) + 1)
					else (c.count / $4)
				end,
		'page', case
					when c.count = 0 then 0
					else $2 / $4 + 1
				end 
	) more_info
from counts c
) select
	more_info,
	list
from a;
`;
