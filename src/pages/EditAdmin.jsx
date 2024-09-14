import { useParams } from 'react-router-dom';

function EditAdmin() {
  const { adminId } = useParams();
  // console.log(adminId);
  return <div>Edit</div>;
}

export default EditAdmin;
