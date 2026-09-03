import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProfile,
  logout,
} from "../../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();

  const {
    user,
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  console.log(user)

  useEffect(() => {
    console.log("fetch profile dispacthed")
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Unable to load profile.</p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>

      {user && (
        <>
          <p>
            Email: {user.email}
          </p>

          {/* <p>
            First Name: {user.first_name}
          </p>

          <p>
            Last Name: {user.last_name}
          </p> */}
        </>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;