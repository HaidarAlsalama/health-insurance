import axios, { all } from "axios";
import config from "Constants/environment";
import { useEffect, useState } from "react";

const useGet2 = (endPoint, initialPageSize = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let allData = [];
      let page = 1;
      let moreData = true;

      while (moreData) {
        try {
          const res = await axios.get(`${config.baseUrl1}/${endPoint}`, {
            params: {
              pageNumber: page,
              pageSize: pageSize,
            },
          });
          if (res.data.items.length > 0) {
            allData = allData.concat(res.data.items);
            page++;
            //  console.log(res.data.items)
         
           } else {
            moreData = false;
          }
        } catch (err) {
          console.log(err);
          moreData = false;
        }
      }

      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, [endPoint, pageSize]);

  return [data, loading, setPageSize];
};

export default useGet2;
