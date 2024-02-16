
import { useUsers } from "../userProvider/UserProviders";
const Profile = () => {
  const user = useUsers();
  return (
    <div>
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
      </ul>
    </div>
  );
};

export default Profile;
