import useAuth from "../hooks/useAuth";

const useUserVerification = () => {
  const { user } = useAuth();
  const Role = user?.Role;
  return Role;
};

export default useUserVerification;
