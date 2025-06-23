import axios from "axios";
import { useEffect, useState } from "react";
import config from "../Constants/environment";
import { useSelector } from "react-redux";

const useGet = (endPoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    axios
      .get(
        `${config.baseUrl1}/${endPoint}`
        , {
          headers: {
            Authorization: `Bearer ${token}`, // التحقق من أن الـ token ليس فارغًا
          }
        }
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  }, []);
  return [data, loading];
};

export default useGet;
