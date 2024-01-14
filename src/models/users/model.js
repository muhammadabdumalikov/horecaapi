module.exports.GETONE = `
	select
		id,
		contact,
		fullname,
		organization,
		legal_name,
		location,
		address,
		ntfs,
		is_verify,
		in_active,
		to_char(created_at, 'hh24:mi / dd.mm.yy') created_at,
		to_char(updated_at, 'hh24:mi / dd.mm.yy') updated_at
	from users where id = $1	
`;

module.exports.ALL = `
with counts as (
	select count(id) 
	from users c
	where concat(c.organization, c.legal_name) ilike
		case
			when $1::text <> '%""%' then $1
			else concat(c.organization, c.legal_name)
		end
), a as (
	select
	array (
		select
			jsonb_build_object (
					'number', row_number() OVER (order by c.id),
					'id', c.id,
					'fullname', c.fullname,
					'organization', c.organization,
					'legal_name', c.legal_name,
					'location', c.location,
					'address', c.address,
					'is_verify', c.is_verify,
					'in_active', c.in_active,
					'created_at', to_char(c.created_at, 'hh24:mi / dd.mm.yy'),
					'updated_at', to_char(c.updated_at, 'hh24:mi / dd.mm.yy')
				)
		from users c
			where concat(c.organization, c.legal_name) ilike
			case
				when $1::text <> '%""%'::text then $1
				else concat(c.organization, c.legal_name)
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

module.exports.INACTIVE = `
update users
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

module.exports.SIGNUP = `
	select signup_user ($1, $2, $3, $4, $5, $6)
`;

module.exports.SIGIN = `
	select sign_in ($1)
`;

module.exports.VERIFYPASSWORD = `
	select verify_gmail_password_u ($1, $2)
`;

module.exports.RETRYVERIFYPASSWORD = `
	select retry_sms_pass($1)
`;
