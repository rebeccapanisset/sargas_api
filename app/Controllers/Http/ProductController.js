const Product = use('App/Models/Product');

class ProductController {
  // Recebe o id do PRODUTO
  async destroy({ params, response }) {
    try {
      const product = await Product.findOrFail(params.id);

      await product.delete();
    } catch (error) {
      response.status(error.status || 500).send({
        error: {
          message: 'Ocorreu um erro! Tanque não encontrado!',
        },
      });
    }
  }
}

module.exports = ProductController;
