module.exports.ALL = `
with counts as (
	select count(id) 
	from agents c
	where concat(fullname, contact) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(fullname, contact)
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
					'uz_district', d.uz_name,
					'ru_district', d.ru_name, 
					'contact', c.contact,
					'username', c.username,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(c.updated_at, 'hh24:mi / dd.mm.yy')
				)
		from agents c
			join districts d on d.id = c.district_id
			where concat(fullname, contact) ilike
			case
				when $1::text <> '%""%'::text then $1
				else concat(fullname, contact)
			end
			and c.in_active = case when $3::bool is not null then $3 else c.i
			order by c.id
			limit $4 offset $2
	) list,
	array(
		select
			jsonb_build_object (
					'number', row_number() OVER (order by c.id),
					'id', c.id,
					'ru_name', c.ru_name,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy')
				)
		from districts c
		order by c.id
	) district_list,
	jsonb_build_object(
		'count', c.count,
		'pages', case
					when c.count = 0 then 0
					when c.count < ($4 + 1) then 1
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
	list,
	district_list
from a;
`;

module.exports.CREATE = `
insert into agents (district_id, fullname, contact, username, password)
values($1, $2, $3, $4, crypt($5, gen_salt('bf', 8))) returning id
`;

module.exports.UPDATE = `
update agents
set
	district_id = $1,
	fullname = $2,
	contact = $3,
	username = $4,
	password = crypt($5, gen_salt('bf', 8)),
	updated_at = now()
where id = $6
returning id	
`;

module.exports.INACTIVE = `
update agents
set
	in_active =
		case
			when in_active = true then false
			when in_active = false then true
		end,
	updated_at = now()
	where id = $1
returning id
`;
