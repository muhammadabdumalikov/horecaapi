module.exports.DISTRICTS = `
select
    r.id,
    r.uz_name,
    r.ru_name,
    r.en_name,
    array(
        select
        jsonb_build_object (
            'id', d.id,
            'uz_name', uz_name,
            'ru_name', ru_name,
            'en_name', en_name
        )
        from districts d where r.id = d.region_id
    ) distrs
   from regions r
`;
