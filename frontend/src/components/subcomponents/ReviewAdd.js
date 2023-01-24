import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import ReactStars from 'react-stars'
import { Reviewadd } from '../../actions/productAction'
const ReviewAdd = (id) => {

  const [reviewadd, setreviewadd] = useState("")
  const [rating, setrating] = useState(0)
  const dispatch=useDispatch();
  const handleSubmit=(newRating)=>{
   setrating(newRating);
  }
  const SubmitReview=async()=>{
    const myForm=new FormData();
    myForm.set("productId",id);
    myForm.set("comment",reviewadd);
    myForm.set("rating",rating);
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.put(`api/v1/review`,
      myForm,
      config
    )
    console.log(data);
  }

  return (
    <div>
    <h3>Review this product</h3>
  <div className="mb-3 row">
    <label for="inputPassword" className="col-sm-2 col-form-label">Add your review</label>
    <div className="col-sm-10">
      <ReactStars  onChange={handleSubmit} color2={'#ffd700'} size={24}/>
      <textarea name="review"  cols="50" onChange={(e) => setreviewadd(e.target.value)} rows="7" ></textarea>
      <button onClick={SubmitReview}>Add Review</button>
    </div>
  </div>

    </div>
  )
}

export default ReviewAdd