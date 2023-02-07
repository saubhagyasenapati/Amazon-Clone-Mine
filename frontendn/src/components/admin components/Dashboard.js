import React,{useEffect} from "react";
import styled from "styled-components";
import Sideboard from "./Sideboard";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import {Doughnut,Line} from "react-chartjs-2"
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,ArcElement,Tooltip,Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin } from "../../actions/productAction";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
)
const Dashboard = () => {
  const dispatch=useDispatch();
  let inStock=0;
  const {products}=useSelector((state)=>state.products);
  let OutofStock=0;
  products && products.forEach((item)=>{
    if(item.Stock===0){
      OutofStock+=1
    }
    ++inStock
  })

  useEffect(() => {
    dispatch(getProductAdmin())
}, [dispatch])

    const lineState={
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49"],
                borderColor: 'rgb(75, 192, 192)',
                data:[0,4000]
            }
        ]
    }

    const doughnutState={
        labels:["Out of Stock","Instock"],
        datasets:[{
            backgroundColor:["#00A684","#680084"],
            hoverBackgroundColor:["#4B5000","#35014F"],
            data:[OutofStock,inStock-OutofStock]
        }]
    }
    // const data = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //       {
    //         label: "First dataset",
    //         data: [33, 53, 85, 41, 44, 65],
    //         fill: true,
    //         backgroundColor: "rgba(75,192,192,0.2)",
    //         borderColor: "rgba(75,192,192,1)"
    //       },
    //       {
    //         label: "Second dataset",
    //         data: [33, 25, 35, 51, 54, 76],
    //         fill: false,
    //         borderColor: "#742774"
    //       }
    //     ]
    //   };

  
  return (
    <Section>
      <div className="dashboard">
        <Sideboard />
        <div className="dashboardContainer">
          <Typography variant="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div className="amountdiv">
              <p>
                Total Amount <br />
                20000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p> <p>{inStock}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>10</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>
            <div className="donutChart">
                <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;

const Section = styled.section`
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
  .dashboardContainer {
    border-left: 1px solid rgba(0, 0, 0, 0.13);
    padding-left: 20px;
    .dashboardSummary {
      div {
        display: flex;
        justify-content: center;
      }
        .amountdiv{
          p {
            background-color: rgba(70, 117, 218, 0.932);
            padding:1rem;
            text-align:center ;
            color: white;
            width: 100%;
            margin: 0 2rem;
            font-size:1.3rem ;
          }
        }
      }
    }
  .dashboardSummaryBox2{
    a{
        color:black;
        text-align:center ;
        background-color:rgba(255,233,174) ;
        justify-content:center ;
        align-items:center ;
        flex-direction:column ;
        border-radius:100% ;
        padding:1.5rem ;
        font:300 1.5rem "Roboto" ;
        margin:2rem ;
        height:12vmax ;
        width:12vmax ;
        text-decoration:none ;
    }

  }
  .donutChart{
    width:100% ;
    height:500px;
  }
  .lineChart{
    width:100% ;
    height:50% ;
  }
`;
