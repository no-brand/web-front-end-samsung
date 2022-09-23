import styled from 'styled-components/macro';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import { func } from 'prop-types';
import { useCart } from 'context/CartContext';

export default function CartList() {
  // products 들을 표시해줄거니, carts.products 로 보여줌
  // 그리고 그때의 콜백함수는 전달된 handleUpdateAmount 로 호출
  const { carts, handleUpdateAmount } = useCart();
  return (
    <Container>
      {carts.products.map((product) => (
        <CartItem key={product.id} product={product} onUpdate={handleUpdateAmount} />
      ))}
      <CartFooter />
    </Container>
  );
}

CartList.propTypes = {
  onUpdate: func,
};

/* -------------------------------------------------------------------------- */

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;
