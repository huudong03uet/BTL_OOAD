function check_required_field(obj, required_fields) {
    for (const field of required_fields) {
        if (obj[field] === undefined || obj[field] === null) {
            return false;
        }
    }
    return true;
}

module.exports = check_required_field
