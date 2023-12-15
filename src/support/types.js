module.exports.newLine = Array.prototype.newLine = function () {
	return Array.from(this).some((str) => str?.includes(String("\n")));
};
