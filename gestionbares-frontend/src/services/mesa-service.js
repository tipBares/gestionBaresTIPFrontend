import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMesas() {
  try {
    const response = await axios({
      url: `${baseUrl}/mesas`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function getMesaById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/mesas/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
