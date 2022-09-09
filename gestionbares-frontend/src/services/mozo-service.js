import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMozos() {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo/All`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
