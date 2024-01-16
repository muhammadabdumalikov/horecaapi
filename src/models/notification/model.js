module.exports.ALL = `
with counts as (
	select count(id) 
	from notifications c
	where concat(topic) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(topic)
		end
		and c.in_active = case when $3::bool is not null then $3::bool else c.in_active end
), a as (
	select
	array (
		select
			jsonb_build_object (
					'number', row_number() OVER (order by c.id),
					'id', c.id,
					'topic', c.topic,
					'content', left(c.content, 15),
					'image', c.image,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(c.updated_at, 'hh24:mi / dd.mm.yy')
				)
		from notifications c
			where concat(topic) ilike
			case
				when $1::text <> '%""%'::text then $1
				else concat(topic)
			end
			and c.in_active = case when $3::bool is not null then $3::bool else c.in_active end
			order by c.id
			limit $4 offset $2
	) list,
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
	list
from a;
`;

module.exports.CREATE = `
insert into notifications (topic, content, image)
values($1, $2, $3) returning id
`;

module.exports.UPDATE = `
with a as (
	select image old_image from  notifications where id = $4 
), updated as (
	update notifications
	set
		topic = $1,
		content = $2,
		image = $3,
		updated_at = now()
	where id = $4
	returning id
) select a.old_image as "oldImage", updated.id from a, updated
`;

module.exports.INACTIVE = `
update notifications
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

module.exports.DELETED = `
delete from notifications where id = $1 returning id, image as "oldImage"
`;
