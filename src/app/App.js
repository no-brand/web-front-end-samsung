import axios from 'axios';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components/macro';
import GlobalStyle from 'styles/GlobalStyle';
import { Cart } from 'components';
import { CartProvider } from 'context/CartContext';

export default function App() {
  let [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState({
    title: '장바구니',
    products: null,
    totalPrice: 0,
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products.json');
        setCarts({
          ...carts,
          products: data,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (carts.products) {
      setCarts((carts) => ({
        ...carts,
        totalPrice: carts.products.reduce?.(
          (acc, { price, amount }) => acc + price * amount,
          0
        ),
      }));
    }
  }, [carts.products]);

  const handleUpdateAmount = useCallback((id, count) => {
    setCarts((carts) => ({
      ...carts,
      products: carts.products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            amount: count,
          };
        }
        return product;
      }),
    }));
  }, []);

  // carts 객체를 Context 에서 관리할거고, 
  // .products 에 개수가 변경되면 handleUpdateAmount 함수를 호출해서 totalAmount 계산을 할 예정
  const cartsValue = useMemo(
    () => ({
      carts,
      handleUpdateAmount
    }), [carts]
  );

  if (loading) {
    return <Loading role="alert">제품 정보 로딩 중...</Loading>;
  }

  if (error) {
    return <ErrorDisplay role="alert">오류 발생: {error.message}</ErrorDisplay>;
  }

  return (
    // 정의한 CartProvider 에 정의한 value (useMemo 에 담긴 carts 객체) 를 담아서 연결함
    // props 로 전달하는 인자형태는 모두 제거함
    <CartProvider value={cartsValue}>
      <GlobalStyle />
      <Container>
        <Cart />
      </Container>
    </CartProvider>
  );
}

/* -------------------------------------------------------------------------- */

const positionMixin = css`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  font-size: 22px;
`;

const Loading = styled.div`
  ${positionMixin}
  top: 30%;
`;

const ErrorDisplay = styled.div`
  ${positionMixin}
  color: #d20;
`;

const Container = styled.div`
  margin-top: 60px;
`;
