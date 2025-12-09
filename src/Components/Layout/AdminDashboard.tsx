import { deleteJWTToken } from '../../Slices/JWTSlice'
import { useDispatch } from 'react-redux'

const AdminDashboard = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={()=>{dispatch(deleteJWTToken())}}>Delete</button>
    </div>
  )
}

export default AdminDashboard;
