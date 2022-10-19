let IndexController = {
  home: async (req, res) => {
    res.render("index.twig", { title: "Index" });
  },
};
export default IndexController;
