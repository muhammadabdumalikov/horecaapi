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
