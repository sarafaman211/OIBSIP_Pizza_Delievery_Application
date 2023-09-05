import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import '../../../styles/shipping.scss';
import { useNavigate } from "react-router-dom"

const Shipping = () => {
  const location = useNavigate()
  const [houseNo, setHouseNo] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to store the shipping data
    const shippingData = {
      houseNo,
      city,
      country,
      state,
      pincode,
      phoneNo,
    };

    // Save the shipping data in localStorage as a JSON string
    localStorage.setItem('shippingData', JSON.stringify(shippingData));

    location("/confirmOrder")
  };

  return (
    <section className="shipping" style={{ marginTop: '2rem' }}>
      <main>
        <h1>Shipping Details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>H.No.</label>
            <input
              type="text"
              placeholder="Enter House No."
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>Country</label>
            <select value={country} onChange={handleCountryChange}>
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((i) => (
                  <option value={i.isoCode} key={i.isoCode}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>State</label>
            <select value={state} onChange={handleStateChange}>
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country).map((i) => (
                  <option value={i.isoCode} key={i.isoCode}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Pin Code</label>
            <input
              type="number"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <label>Phone No.</label>
            <input
              type="number"
              placeholder="Enter Phone No."
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <button style={{ textDecoration: "none" }} onClick={handleSubmit} type="submit">Confirm Order</button>
        </form>
      </main>
    </section>
  );
};

export default Shipping;
