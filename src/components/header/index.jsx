
import { useContext } from "react";
import './styles.css';
import { CartContext } from "../../context/cart-context";

const Header = ({ logo }) => {
    const { cart } = useContext(CartContext)
    return (
        <header className="header">
            <a href="/" className="logo">{logo}</a>
            <input type="checkbox" className="side-menu" id="side-menu" />
            <label className="hamb" htmlFor="side-menu">
                <span className="hamb-line"></span>
            </label>
            <nav className="nav">
                <ul className="menu">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                    <li className="menu-cart-container">
                        <img src="https://cdn-icons-png.flaticon.com/512/5465/5465858.png " alt="" className="menu-cart-img" />
                        <div className="menu-cart-count-container">
                            <span className="menu-cart-count">{cart.length}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;