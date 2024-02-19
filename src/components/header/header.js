import React, { useState, useEffect } from "react";

const Header = () => {
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(window.location === "/");
  }, [window.location]);

  const handleCreateNew = () => {
    window.location.href = "/create-new";
  };

  return (
    <div className="header mt-3">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            {isHomePage ? (
              <h2 className="font-weight-bold">Create New</h2>
            ) : (
              <h2 style={{ fontWeight: 900 }}>Orders</h2>
            )}
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary"
              size="large"
              onClick={handleCreateNew}
            >
              {isHomePage ? "Home" : "CREATE NEW"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
