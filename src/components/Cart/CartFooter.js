import { number } from 'prop-types';
import CartTotal from './CartTotal';
import { useCart } from 'context/CartContext';

const CartFooter = ({ ...restProps }) => {
  // 최종가격을 표시해줄거니, carts.totalPrice 로 보여줌
  const { carts, handleUpdateAmount } = useCart();

  // 잘 넘어오는지 테스트
  console.log(carts);

  return (
    <footer {...restProps}>
      <CartTotal>{carts.totalPrice}</CartTotal>
    </footer>
  );
}

CartFooter.propTypes = {
  total: number.isRequired,
};

export default CartFooter;
