import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
      <div className="text-dark d-flex align-items-center justify-content-center vh-100 p-4">
        <div>
          <h1 className="text-dark text-center">Welcome to Our Online Store</h1>
          <Image src="https://www.poddigital.co.uk/wp-content/uploads/2018/02/Untitled-design-6.png"
            style={{ width: "62rem" }}
          />
          <p className="text-center">Start your shopping now!</p>
          <div className="d-grid gap-2 col-4 mx-auto">
            <Link to="/products" className="btn btn-outline-warning btn-lg mt-3">
              <b>Browse Products</b>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Home;
