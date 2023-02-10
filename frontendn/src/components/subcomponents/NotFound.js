import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderDetails = () => {
    
    
   
    return (
        <Section>
                  <div id="main">
    	<div className="fof">
        		<h1>Error 404</h1>
                <button ><Link to="/" >Back To Home</Link></button>
    	</div>
</div>
        </Section>

      )
  };
  
  export default OrderDetails;
  
  const Section = styled.section`
  *{
    transition: all 0.6s;
}

html {
    height: 100%;
}

body{
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
}

#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.fof{
	  display: table-cell;
	  vertical-align: middle;
}

.fof h1{
	  font-size: 50px;
	  display: inline-block;
	  padding-right: 12px;
	  animation: type .5s alternate infinite;
}
button{
    margin: 15px auto;
    color:black;
        display: grid;
        background-color: #ff9900;
        border: 1px solid;
        border-radius: 0.3rem;
        border-color: #a88734 #9c7e31 #846a29;
}

@keyframes type{
	  from{box-shadow: inset -3px 0px 0px #888;}
	  to{box-shadow: inset -3px 0px 0px transparent;}
}
  `;
  