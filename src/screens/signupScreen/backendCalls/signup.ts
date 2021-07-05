import axios from '../../../axiosServices';

export const signup = async (data: {
  email: string;
  firstname: string;
  lastName: string;
}) => {
  const response = await axios.post('authentication/sign-up', data);
  return response.data;
};
