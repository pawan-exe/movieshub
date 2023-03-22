import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { moviesRef } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { MutatingDots } from "react-loader-spinner";
import Review from "./Review";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(moviesRef, id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <MutatingDots
            height={100}
            width={100}
            color="white"
            secondaryColor="red"
          />
        </div>
      ) : (
        <>
          <img className="h-96 block md:sticky top-24" src={data.image}></img>
          <div className="ml-4 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400 ">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars
              size={30}
              half={true}
              value={data.rating / data.rated}
              edit={false}
            />
            <p className="text-lg md:text-xl">{data.description}</p>
            <Review id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
