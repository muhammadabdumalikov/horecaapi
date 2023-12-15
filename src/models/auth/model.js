module.exports.AUTH = `
	select
		id,
		username,
		in_active as "inActive",
		to_char(created_at, 'hh24:mi / dd.mm.yyyy') as "createdAt"
	from admins
	where username = $1 and password = crypt($2, password)
`;
