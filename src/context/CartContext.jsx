import React, { useContext } from "react";

// 컨택스트 생성
const CartContext = React.createContext();

// 컨택스트 래퍼 컴포넌트
// value 에 앞에서 관리하는 carts = { ... } 를 담아서 관리할거임
export const CartProvider = ({ value, children }) => {
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 커스텀 훅
// Context 를 통해서 올라온 정보를 읽을때 사용
export const useCart = () => {
    const value = useContext(CartContext);
    if (!value) {
        throw new Error('');
    }
    return value;
};