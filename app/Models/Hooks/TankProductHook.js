const TankProductHook = (exports = module.exports = {});

/**
 * Este hook é responsável por carregar as informações
 * contidas em produto no objeto de tanque.
 */

TankProductHook.loadAttributes = async (tank) => {
  const product = await tank.product().fetch();
  if (product.image_id) {
    const image = await product.image().fetch();
    tank.image = image;
  }

  tank.datatype = product.datatype;
  tank.description = product.description;
  tank.price = product.price;
};
