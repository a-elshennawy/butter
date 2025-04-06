import { useState } from "react";
import { Link } from "react-router-dom";
import "./Reservations.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Joi from "joi";

export default function Reservations() {
  const [Resdata, setResData] = useState({
    FullName: "",
    Phone: "",
    Guests: "",
    Date: "",
    additional_notes: "",
  });

  const [error, setError] = useState("");

  const schema = Joi.object({
    FullName: Joi.string()
      .pattern(/^[a-zA-Z]{1}[a-zA-Z ]{4,19}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Full name must be 5-20 letters long and contain no numbers or special characters.",
        "string.empty": "Full name is required.",
      }),

    Phone: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be 10 digits long.",
        "string.empty": "Phone number is required.",
      }),

    Guests: Joi.number().integer().min(1).max(30).required().messages({
      "number.base": "Guests must be a number.",
      "number.integer": "Guests must be an integer.",
      "number.min": "Guests must be at least 1.",
      "number.max": "Guests cannot exceed 30.",
      "any.required": "Guests field is required.",
    }),

    Date: Joi.date().iso().greater("now").required().messages({
      "date.base": "Date must be a valid date.",
      "date.format": "Date must be in ISO 8601 format.",
      "date.greater": "Date must be in the future.",
      "any.required": "Date is required.",
    }),

    additional_notes: Joi.string().max(200).allow("").optional().messages({
      "string.base": "Additional notes must be a string.",
      "string.max": "Additional notes must be at most 200 characters long.",
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResData({ ...Resdata, [name]: value });

    const { error: validationError } = schema.validate(
      { ...Resdata, [name]: value },
      { abortEarly: false }
    );

    if (validationError) {
      const fieldError = validationError.details.find(
        (detail) => detail.context.key === name
      );
      setError(fieldError ? fieldError.message : "");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error: validationError } = schema.validate(Resdata, {
      abortEarly: false,
    });

    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    const Existing_Reservations =
      JSON.parse(localStorage.getItem("User_Reservations")) || [];

    const Update_Reservations = [...Existing_Reservations, Resdata];

    localStorage.setItem(
      "User_Reservations",
      JSON.stringify(Update_Reservations)
    );

    setError("");
    setResData({
      FullName: "",
      Phone: "",
      Guests: "",
      Date: "",
      additional_notes: "",
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Butter - Reservation</title>
          <meta
            name="description"
            content="here you can book a table for your night remotly and just come when it is the time"
          />
        </Helmet>
      </HelmetProvider>
      <div className="res">
        <div className="container-fluid">
          <div className="header row">
            <div className="col-6 left">
              <h2>Reservations</h2>
              <h6>book a table</h6>
            </div>
            <div className="col-6 right">
              <p>
                <Link to={"/"}>home</Link> / Reservations
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <form className="reservation_form row" onSubmit={handleSubmit}>
            <h3>Reservation form</h3>
            <div className="input-container col-5">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                name="FullName"
                placeholder="Full name"
                required
                id=""
                value={Resdata.FullName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container col-5">
              <i className="fa-solid fa-phone"></i>
              <input
                type="text"
                name="Phone"
                placeholder="phone number"
                required
                id=""
                value={Resdata.Phone}
                onChange={handleChange}
              />
            </div>
            <div className="input-container col-5">
              <input
                type="number"
                name="Guests"
                placeholder="number of guests"
                required
                id=""
                value={Resdata.Guests}
                onChange={handleChange}
              />
            </div>
            <div className="input-container col-5">
              <input
                type="date"
                name="Date"
                required
                id=""
                value={Resdata.Date}
                onChange={handleChange}
              />
            </div>
            <div className="textarea-container col-12">
              <i className="fa-solid fa-comment"></i>
              <textarea
                cols="10"
                rows="10"
                name="additional_notes"
                placeholder="additional notes (optional)"
                value={Resdata.additional_notes}
                onChange={handleChange}
                id=""
              ></textarea>
            </div>
            <p className="error">{error}</p>
            <div className="col-10 notice">
              <p>
                * kindly note we will contact you on the provided phone number
                48 hours before reservation for extra information and
                confirmation
              </p>
            </div>
            <button type="submit" className="col-5 resBtn">
              reserve now!
            </button>
            <button className="toResBtn col-6">
              <Link to={"/UserRes"}>check your reservations</Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
