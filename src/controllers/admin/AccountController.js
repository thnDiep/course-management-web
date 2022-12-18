class accountController {
  // GET categories list
  async index(req, res) {
    res.render("vwAdmin/accounts", {
      layout: "admin",
    });
  }
}

export default new accountController();
