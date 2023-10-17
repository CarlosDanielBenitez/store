/* eslint-disable react/jsx-key */
import { useState } from 'react'
import './styles.css'
import Header from '../../components/header'
import Input from '../../components/input';
import Card from '../../components/products/card';
import Details from '../../components/products/details';
import Loader from '../../components/loader';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants/index'
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider';


function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [productDetail, setProductDetail] = useState(null);
    const [productFiltered, setProductFiltered] = useState([]);
    const [cart, setCart] = useState([]);

    const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
    const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

    // const filterBySearch = (query) => {
    //     let updateProductList = [...products];

    //     updateProductList = updateProductList.filter((item) => {
    //     return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    //     })

    //     setProductFiltered(updateProductList);
    // }

    // const onChange = (event) => {
    //     const value = event.target.value;
    //     setSearch(value);
    //     filterBySearch(value);
    // }

    // const onFocus = () => {
    //     setActive(true);
    // }

    // const onBlur = () => {
    //     setActive(false);
    // }


    //detail products
    const onShowDetails = (id) => {
        navigate(`/products/${id}`)
    }

    // filter function
    const onFilter = (name) => {
        setIsFiltered(true)
        const productsByCategory = products.filter((product) => product.category === name);
        setProductFiltered(productsByCategory)
    }

    //cart function
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
    console.log({ cart });

    return (
        <div>
            <div className='contentContainer'>
                <div className='categoriesContainer'>
                    {loadingCategories && <Loader />}
                    {errorCategories && <h2>{errorCategories}</h2>}
                    <Slider>
                        <button onClick={() => setIsFiltered(false)} type='button' className="categoryContainer">
                            <p className='categoryName'>All</p>
                        </button>
                        {
                            categories.map((category) => (
                                <button onClick={() => onFilter(category.name)} type='button' key={category.id} className='categoryContainer'>
                                    <p className='categoryName'>{category.name}</p>
                                </button>
                            ))
                        }

                    </Slider>
                </div>
                {/* <div className='inputContainer'>
            <Input 
                placeholder='find a product'
                id='task'
                required={true}
                name='Search'
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                active={active}
            />
            </div> */}
                <h2 className='headerTitleCard'>Products</h2>
                <div className='cardContainer'>
                    {loadingProducts && <Loader />}
                    {errorProducts && <h2>{errorProducts}</h2>}
                    {search.length > 0 && productFiltered.length === 0 && <h2>Product not found</h2>}
                    {
                        isFiltered ? (
                            productFiltered.map((product) => (
                                <Card key={product.id} {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart} />
                            ))
                        ) : (
                            products.map((product) => (
                                <Card key={product.id} {...product} onShowDetails={onShowDetails} onAddToCart={onAddToCart} />
                            ))
                        )
                    }
                    {
                        isFiltered && productFiltered.length === 0 && <h2>Products not found</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
