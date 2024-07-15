import axios from "axios";

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get("http://localhost:3000/check-session", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
