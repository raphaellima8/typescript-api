/* jshint esversion:6*/
module.exports = function () {
	return require(`../env/${process.env.NODE_ENV}.env.js`);
};
