import React, { useContext, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { useEffect } from "react";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Review = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setreviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);

  const sendReview = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(reviewsRef, {
          movieid: id,

          name: useAppstate.username,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1);
        swal({
          title: "Review sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      } else {
        navigate("/login");
        swal("Please Login to Continue");
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setreviewsLoading(true);
      setData([]);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setreviewsLoading(false);
    }
    getData();
  }, [newAdded]);

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={25}
        value={rating}
        half={true}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share your thoughts..."
        className=" w-full p-2 outline-none header"
      />
      <button
        onClick={sendReview}
        className="bg-green-700 flex justify-center w-full p-2 mt-3"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {reviewsLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={20} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className="p-2 w-full mt-2 border-b header bg-opacity-50 border-gray-600"
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    {" "}
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>

                <ReactStars
                  size={25}
                  value={e.rating}
                  half={true}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
