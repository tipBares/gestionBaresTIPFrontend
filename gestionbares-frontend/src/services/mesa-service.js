import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMesas() {
  try {
    const response = await axios({
      url: `${baseUrl}/mesa/get`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
