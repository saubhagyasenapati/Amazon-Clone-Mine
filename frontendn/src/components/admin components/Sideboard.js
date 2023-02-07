import React from 'react'
import logo from '../../Assets/logo2.jpg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TreeView,TreeItem } from '@mui/lab';
const Sideboard = () => {
  return (
    <Section className='sidebar'>
        <Link className='header' to="/"><img src={logo} alt="" /></Link>
        <Link to="/admin/dashboard"><p><DashboardIcon/>Dashboard</p></Link>
          <TreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ImportExportIcon/>}>
         <TreeItem nodeId='1' label="Products">
                  <Link to="/admin/products">
                  <TreeItem nodeId='2' label="ALL" icon={<PostAddIcon/>}/>
                  </Link>
                  <Link to="/admin/product">
                  <TreeItem nodeId='3' label="create" icon={<AddIcon/>}/>
                  </Link>
         </TreeItem>
          </TreeView>

          <Link to="/admin/orders">
           <p><ListAltIcon/>Orders</p>
          </Link>
          <Link to="/admin/users">
           <p><PeopleIcon/>Users</p>
          </Link>
          <Link to="/admin/reviews">
           <p><RateReviewIcon/>Reviews</p>
          </Link>
    </Section>
  )
}

export default Sideboard

const Section=styled.section`  
a{
 text-decoration:none ;
 transition:all 0.5s ;
 color:grey;
  padding:2rem ;
}
.sidebar{
    background-color:white ;
    display:flex ;
    flex-direction:column ;
    padding:4rem 0 ;
    
}

.header{
    padding:0;
    img{
    height:100px ;
    width:90% ;
    object-fit:contain ;
}
}


`
