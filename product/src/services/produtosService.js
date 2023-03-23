const regexNome = /^[A-z][\sA-z0-9]{3,}$/;
const regexSlug = /^[A-z0-9-]+$/;

export default {
  validaAlteracao: (produto) => {
    if (
      regexNome.test(produto.produto)
      && regexSlug.test(produto.slug)
      && produto.precoUnitario > 0
      && produto.quantidadeEmEstoque > 0
      && produto.quantidadeEmEstoque < 10000
    ) return true;
    return false;
  },
};
