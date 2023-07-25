import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <div className="text-sm text-blue-500 hover:text-blue-600">
        <span>&larr;&#32;</span>
        <LinkButton to="/menu">Back to menu</LinkButton>
      </div>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
