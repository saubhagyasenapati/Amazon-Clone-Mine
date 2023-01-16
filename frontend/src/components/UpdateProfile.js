import React from 'react'
import { useSelector } from 'react-redux';

const UpdateProfile = () => {
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.user);
    const {error,isUpdated,loading}=useSelector((state)=>state.profile);
    const [name, setname] = useState(user.name);
    const [email, setemail] = useState(user.email);
    const [avatar, setAvatar] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log(avatar);
        dispatch(register(myForm));
      };
      const handleChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setAvatar("photo")
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
  return (
    <div>
      
    </div>
  )
}

export default UpdateProfile
