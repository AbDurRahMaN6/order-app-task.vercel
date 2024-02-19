import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Form({ addRow }) {
  const [formData, setFormData] = useState({
    ID: "",
    SHPIIFY: "",
    DATE: "",
    STATUS: "",
    CUSTOMER: "",
    EMAIL: "",
    COUNTRY: "",
    SHIPPING: "",
    SOURCE: "",
    ORDERTYPE: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRow(formData);
    setFormData({
      ID: "",
      SHPIIFY: "",
      DATE: "",
      STATUS: "",
      CUSTOMER: "",
      EMAIL: "",
      COUNTRY: "",
      SHIPPING: "",
      SOURCE: "",
      ORDERTYPE: "",
    });
  };

  return (
    <div className="container">
      <form className="row g-3" novalidate onSubmit={handleSubmit}>
        <div className="col-md-6">
          <h5 for="validationCustom01" className="form-label">
            Enter your ID
          </h5>
          <input
            type="number"
            className="form-control"
            id="validationCustom01"
            placeholder="Enter Your ID"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <h5 for="validationCustom02" className="form-label">
            Shpiify
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Your Shpiify"
            required
          />
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Date
          </h5>
          <input
            type="date"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Status
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            required
            placeholder="Enter Status"
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Customer
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Customer"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Email
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Country
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Country"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <h5 for="validationCustom02" className="form-label">
            Shipping
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Shipping Method"
            required
          />
        </div>
        <div className="col-md-6">
          <h5 for="validationCustom02" className="form-label">
            Source
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Source"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <h5 for="validationCustom02" className="form-label">
            Order Type
          </h5>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={handleChange}
            placeholder="Enter Order Type"
            required
          />
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: 20 }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
