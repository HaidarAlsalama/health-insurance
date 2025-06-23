import axios from "axios";
import { useEffect, useState } from "react";
import config from "../Constants/environment";
import { createAlert } from "components/Alert/Alert";

const usePost = (endPoint, Body) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${config.baseUrl1}/${endPoint}`, Body);
      console.log(res);
      setMessage(res.status);
    }catch (err) {
      console.log(err);
      createAlert("Error", "فشل الارسال");
      // يبقى التحميل مفعّلاً لثانيتين بعد الفشل
}
     finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const message1 = message; // Assuming you have another message state or prop

    if (message1 === 200) {
      setTimeout(() => {
        createAlert("Success", "نجاح الارسال");
        setMessage(null);
      }, 1000);
    }
  }, [message]);

  return [loading, message, handleClick];
};

export default usePost;
