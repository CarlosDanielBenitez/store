import { createContext, useState } from "react";

const initialState = {
    products: [],
    categories: [],
    cart: [],
    setCart: () => { },
    getItemQuantity: () => { },
    onDrecreaseItem: () => { },
    onAddToCart: () => { },
    onRemoveItem: () => { },
    total: 0,
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);



    const onAddToCart = (id) => {
        //find the product
        const item = products.find(product => product.id === id);

        // stock limit
        if (cart?.find(product => product.id === id)?.quantity === Number(item.stock)) return;

        //add product with property quantity to cart when it's empty
        if (cart?.length === 0) {
            setCart([{ ...item, quantity: 1 }])
        }

        // add product to cart when it's not empty, but is not in the cart
        if (cart?.length > 0 && !cart?.find(product => product.id === id)) {
            setCart([...cart, { ...item, quantity: 1 }])
        }

        // when it's not empty and the product is already in the cart. Add an item
        if (cart?.length > 0 && cart?.find(product => product.id === id)) {
            setCart(currentCart => {
                return currentCart.map(product => {
                    if (product.id === id) {
                        return { ...product, quantity: product.quantity + 1 }
                    } else {
                        return product;
                    }
                })
            })
        }
    }

    const onDrecreaseItem = (id) => {
        if (cart?.find(product => product.id === id)?.quantity === 1) return;
        if (cart?.length > 0 && cart?.find(product => product.id === id)) {
            setCart(currentCart => {
                return currentCart.map(product => {
                    if (product.id === id) {
                        return { ...product, quantity: product.quantity - 1 }
                    } else {
                        return product;
                    }
                })
            })
        }
    }

    const onRemoveItem = (id) => {
        setCart(currentCart => {
            return currentCart.filter(product => product.id !== id)
        })
    }
    const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)

    const getItemQuantity = (id) =>{
        return cart.find(product => product.id === id)?.quantity || 0;
        // its to know quantity of products in cart
    }

    const getTotalQuantityItem = () =>{
        return cart.reduce((acc, product) => acc + product.quantity, 0)
    }

    //return functions
    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            onDrecreaseItem,
            onAddToCart,
            onRemoveItem,
            total,
            products,
            setProducts,
            categories,
            setCategories,
            getItemQuantity,
            getTotalQuantityItem
        }}
        >
            {children}      {/* the children that wrapping in this component */}
        </CartContext.Provider>
    )

}