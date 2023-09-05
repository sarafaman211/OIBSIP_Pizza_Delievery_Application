import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pizzaContext from '../../context/pizzaContext';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import SinglePizza from '../Pages/User dashboard/SinglePizza';
import Spinner from '../Utils/Spinner';
import toast, { Toaster } from "react-hot-toast"

const Pizza = () => {
  const { getPizza, product } = useContext(pizzaContext);
  const [search, setSearch] = useState('');
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pizzaData, setPizzaData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const cancel = () => {
    setSearch('');
  };

  const openModal = (pizza) => {
    setSelectedPizza(pizza);
    setShowModal(true);
  };

  const savePizzaToLocalstorage = (pizza) => {
    // Update the pizzaData state variable
    setPizzaData([...pizzaData, pizza]);
    toast.success("Pizza Added to cart", {
      duration: 3000,
      position: "top-right"
    })
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Use the useEffect hook to watch for changes in pizzaData and save it to local storage
  useEffect(() => {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('selectedPizzas', JSON.stringify(pizzaData));
    } else {
      console.error('Local storage is not available in this browser.');
    }
  }, [pizzaData]);

  useEffect(() => {
    getPizza();
    // console.log(product)
  }, [getPizza]);

  return (
    <section style={{ backgroundColor: '#bf8d3c', position: 'relative' }}>
      <div className="container" style={{ paddingTop: '7rem', height: '100%' }}>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              style={{
                width: '60%',
                border: 'none',
                textAlign: 'center',
                background: 'transparent',
                outline: 'none',
                borderBottom: '2px solid #333',
                color: '#fff',
              }}
              value={search}
              type="text"
              placeholder="search..."
              onChange={handleChange}
            />
            <button
              onClick={cancel}
              style={{ background: 'transparent', marginLeft: '1rem', outline: 'none', border: 'none' }}
            >
              Cancel
            </button>
          </div>
          <Link to="/customPizza" className="custom-pizza-button">
            Custom Pizza
          </Link>
        </div>
        <h4 className="text-center my-3">Pizzas</h4>
        <div className="row container mx-2">
          {!product ? (
            <Spinner />
          ) : (
            product
              .filter((value) => {
                if (search === '') {
                  return true;
                } else {
                  return value.name.toLowerCase().includes(search.toLowerCase());
                }
              })
              .map((data, index) => (
                <div
                  key={index}
                  className="col-md-6 col-lg-4 g-4"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card" style={{ width: '23rem' }}>
                    <img src={data.image} className="card-img-top" style={{ height: '130px' }} alt="Pizza" onClick={() => openModal(data)} />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text two-line-description">{data.description}</p>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center nopadding">
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='px-2'>
                              <span>Small</span><br />
                              <strong>₹{data.prices[0].small}</strong>
                            </div>
                            <div className='px-2'>
                              <span>Medium</span><br />
                              <strong>₹{data.prices[0].medium}</strong>
                            </div>
                            <div className='px-2'>
                              <span>large</span><br />
                              <strong>₹{data.prices[0].large}</strong>
                            </div>
                          </div>

                          <div style={{ color: 'orange' }}>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <BsStarHalf />
                            <AiOutlineStar />
                          </div>
                        </div>

                        <button onClick={() => savePizzaToLocalstorage(data)} style={{ backgroundColor: '#bf8d3c', color: '#fff' }} className="btn">
                         Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
        <SinglePizza pizza={selectedPizza} showModal={showModal} closeModal={closeModal} />
        <Toaster />
      </div>
    </section>
  );
};

export default Pizza;
