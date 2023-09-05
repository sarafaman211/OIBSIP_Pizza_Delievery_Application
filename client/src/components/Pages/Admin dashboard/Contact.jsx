import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { BsTrashFill } from "react-icons/bs"



const ITEMS_PER_PAGE = 5;

const Contact = () => {
  
  const [ contact, setContact ] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  

  const totalPages = Math.ceil(contact.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = contact.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact/", {
          method: "GET"
        });
  
        if (response.ok) {
          const data = await response.json();
          // console.log(data.contact);
          setContact(data.contact);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message)
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/contact/deleteContacts/${ id }`, {
      method: "DELETE",
    })
    const deleteData = contact.filter(data => { return data._id !== id })
    setContact(deleteData)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="tableClass" style={{ marginTop: "4rem" }}>
      <main>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
          {currentItems && currentItems.map((data, index) => (
              <tr key={data._id}>
                <td>#{index + 1}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.message}</td>
                <td><button onClick={ () => handleDelete(data._id) } type='button'><BsTrashFill style={{ color: "red" }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination position-absolute bottom-0 end-60">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <Toaster />
      </main>
    </section>
  )
}

export default Contact