module.exports = function badRequest(err) {
  var req = this.req;
  var res = this.res;

  return res.status(400).json({ errorMessage: err.toString() });
}
