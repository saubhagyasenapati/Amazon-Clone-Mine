import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route,useNavigate } from 'react-router-dom'

const ProtectedRoute = ({component:Component,...rest}) => {

    const{loading,isAuthenticated,user}=useSelector((state)=>state.user)
  return (
    <Fragment>
        {
          !loading &&(
            <Route {...rest} render={(props)=>{
                 if(!isAuthenticated){
                    return <Route to="/login"/>
                 }
                return <Component {...props}/>
            }}></Route>
          )  
        }
    </Fragment>
  )
}

export default ProtectedRoute