import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none">
            <h1 className="h3 m-0">Carri Shop</h1>
          </Link>
          <nav>
            <ul className="list-unstyled d-flex m-0">
              <li className="mx-2">
                <Link to="/" className="text-white">Home</Link>
              </li>
              <li className="mx-2">
                <Link to="/categories/1" className="text-white">Clothing</Link>
              </li>
              <li className="mx-2">
                <Link to="/categories/2" className="text-white">Accessories</Link>
              </li>
              <li className="mx-2">
                <Link to="/categories/3" className="text-white">Footwear</Link>
              </li>
              <li className="mx-2">
                <Link to="/categories/4" className="text-white">Electronics</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 