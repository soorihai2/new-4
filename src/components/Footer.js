import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Carri Shop</h5>
            <p>Your one-stop shopping destination for quality products at affordable prices.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
              <li><a href="#" className="text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>123 Shopping Street<br />
              Fashion City, FC 12345</p>
              <p>Email: info@carrishop.com<br />
              Phone: +1 (123) 456-7890</p>
            </address>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Carri Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 