import axios from "axios";

export const SingleImageUload = async (imgfile) => {
  try {
    const formData = new FormData();
    formData.append("sizukImg", imgfile);

    const response = await axios.post(`https://nodeimgserver.icicle.dev/api/sizukPost`, formData);
    return {
      id: response.data?.id,
      url: response.data?.sizukImg.replace("backend/", "https://nodeimgserver.icicle.dev/backend/"),
    };
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};
