import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

// const ProtectedRoute=({isAdmin,element:Component,...rest})=>{

//  const {loading,isAuthenticated,user}=useSelector((state)=>state.user);
//  return(
//     <Fragment>
//         {!loading===false&&(
//             <Route {...rest}
//             render={
//                 (props)=>{
//                     if(isAuthenticated===false){
//                         <Navigate to="/login"/>
//                     }
//                     if(isAdmin===true && user.role!=="admin"){
//                         <Navigate to="/login"/>
//                     }
//                     return <Component {...props}/>
//                 }
//             }/>
//         )}
//     </Fragment>
//  )
// }
const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
