import React, { useEffect, useState, useCallback  } from 'react'
import { Link } from "react-router-dom"
import me from "../../../config/me.jpg"
import { GrDocumentUpdate } from "react-icons/gr"
import { BsTrashFill } from "react-icons/bs"

const Users = () => {
  const [ user, setUser ] = useState([])
  const handleData = useCallback (async () =>{
    const data = await fetch("http://localhost:5000/api/getAllUser", {
      method: "GET",
      headers:{
        "auth-token": localStorage.getItem("token")
      }
    })
    const res = await data.json()
    setUser(res)
  }, [])

  useEffect(() => {
    handleData()
  }, [handleData])

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/deleteUser/${ id }`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
    const deleteData = user.filter(data => { return data._id !== id })
    setUser(deleteData)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <section className="tableClass" style={{ marginTop: "4rem" }}>
      <main>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Role</th>
              <th>Since</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            { user && user.map((data, index) => (
              <tr key={index + 1}>
                <td style={{ color: "green" }}>#{ data._id }</td>
                <td><img src={me} alt="User" /></td>
                <td>{ data.name }</td>
                <td>{data.role === 1 ? "Admin" : "User"}</td>
                <td>{formatDate(data.createdAt)}</td>
                <td><Link to={`/admin/updateRole/${data._id}`}><GrDocumentUpdate /></Link></td>
                <td><button onClick={ () => handleDelete(data._id) } type='button'><BsTrashFill style={{ color: "red" }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  )
}

export default Users