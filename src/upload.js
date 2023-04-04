import axios from "axios";


const clodinaryUrl = import.meta.env.VITE_APP_CLOUDINARY_URL;

const upload = async (file) => {

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");

  try {
    const res = await axios.post(clodinaryUrl,
      data
    );

    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default upload;
