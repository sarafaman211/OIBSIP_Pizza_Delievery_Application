import React, { useContext, useEffect } from 'react'
import Loader from "../../Utils/Spinner"
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import "../../../styles/dashboard.scss"
import pizzaContext from '../../../context/pizzaContext';
import Spinner from '../../Utils/Spinner';

ChartJS.register(Tooltip, ArcElement, Legend);

const loading = false;

const Box = ({ title, value }) => (
  <div>
    <h3>
      {title === "Income" && "₹"}
      {value}
    </h3>
    <p>{title}</p>
  </div>
);


const Dashboard = () => {

  const { adminStats, stats } = useContext(pizzaContext)

  useEffect(() => {
    adminStats()
    // console.log(users)
  }, [adminStats])


  if (stats === null || stats === undefined) {
    return <Spinner />;
  }

  
  const data = {
    labels: ["Preparing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "# of orders",
        data: [
          stats.ordersCount.preparing,
          stats.ordersCount.shipped,
          stats.ordersCount.delivered
        ],
        backgroundColor: [
          "rgba(159,63,176,0.1)",
          "rgba(78,63,176,0.2)",
          "rgba(156,0,60,0.3)",
        ],
        borderColor: ["rgb(159,63,176)", "rgb(78,63,176)", "rgb(156,0,60)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <section className="dashboard" style={{ marginTop: "4rem" }}>
      {loading === false ? (
        <main>
          {stats && stats && (
            <article>

              <Box title="Users" value={stats.usersCount} />
              <Box title="Orders" value={stats.ordersCount.total} />
              <Box title="Income" value={(stats.totalIncome).toFixed()} />
            </article>
          )}

          <section>
            <div>
              <Link style={{ textDecoration: "none" }} to="/admin/orders">View Orders</Link>
              <Link style={{ textDecoration: "none" }} to="/admin/users">View Users</Link>
              <Link style={{ textDecoration: "none" }} to="/admin/contactData">View Contacts</Link>
              <Link style={{ textDecoration: "none" }} to="/admin/ingredients">View Stocks</Link>
            </div>

            <aside>
              <Doughnut data={data} />
            </aside>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  )
}

export default Dashboard