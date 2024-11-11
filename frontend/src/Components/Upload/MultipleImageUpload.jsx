import axios from "axios";

export const uploadMultipleImage = async (ImageURLs) => {
  const sendData = [];
  for (const imageURL of ImageURLs) {
    try {
      const formData = new FormData();
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      formData.append("sizukImg", file);

      const response2 = await axios.post(
        `https://nodeimgserver.icicle.dev/api/sizukPost`,
        formData
      );
      sendData.push({
        id: response2.data?.id,
        url: response2.data?.sizukImg.replace(
          "backend/",
          "https://nodeimgserver.icicle.dev/backend/"
        ),
      });
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  return sendData;
};
