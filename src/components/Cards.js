import { isHostComponent } from "@mui/base";
import { setLogLevel } from "firebase/app";
import React, { useEffect, useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef); //moviesRef -> see in firebase.js
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          {" "}
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              {" "}
              <div
                key={i}
                className="card font-medium shadow-lg p-3 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500"
              >
                <img className="h-52 w-36 md:w-48 md:h-72" src={e.image} />
                <h1>{e.title}</h1>
                <h1>
                  <span className="text-gray-500 mr-1">rating : </span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year :</span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
