/* eslint-disable react/jsx-key */
import { useState, useContext, useEffect } from 'react'
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
import { CartContext } from '../../context/cart-context';


function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [productFiltered, setProductFiltered] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { setProducts, onAddToCart } = useContext(CartContext)

    const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
    const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);


    //!detail products
    const onShowDetails = (id) => {
        navigate(`/products/${id}`)
    }



    //! filter function
    const filterBySearch = (query) => {
        //*search for category
        if (selectedCategory !== 'All' && query.length === 0) {
            onFilter(selectedCategory);
            return;
        }
        let updateProductList = query.length === 0 ? [...products] : [...productFiltered];


        updateProductList = updateProductList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })

        setProductFiltered(updateProductList);
    }


    const onChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        filterBySearch(value);
    }

    const onFocus = () => {
        setActive(true);
    }

    const onBlur = () => {
        setActive(false);
    }


    const onFilter = (name) => {
        setIsFiltered(true)
        const productsByCategory = products.filter((product) => product.category === name);
        setProductFiltered(productsByCategory);
        setSelectedCategory(name)
    }

    useEffect(() => {
        if (products?.length > 0) {
            setProducts(products)
        }
    }, [products, setProducts])


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

                <div className='inputContainer'>
                    {
                        isFiltered && (
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
                        )
                    }
                </div>

                <h2 className='headerTitleCard'>Products</h2>
                <div className='cardContainer'>
                    {loadingProducts && <Loader />}
                    {errorProducts && <h2>{errorProducts}</h2>}
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
