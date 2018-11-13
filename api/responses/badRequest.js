module.exports = function badRequest(err) {
  var req = this.req;
  var res = this.res;

  sails.log(err);
  return res.status(400).json({ errorMessage: err.toString() });
}
