import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getCategorias() {
    try {
      const response = await axios({
        url: `${baseUrl}/categoria`,
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return [];
  }

  export async function getCategoriaById(id) {
    try {
      const response = await axios({
        url: `${baseUrl}/categoria/${id}`,
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return [];
  }