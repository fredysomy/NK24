import React, { useState, useEffect, Suspense } from "react";
import { Input } from "@material-tailwind/react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore/lite";
import { Loader } from "../components/Loader";
import { wait } from "@testing-library/user-event/dist/utils";

const Cultural = () => {
  // Your component logic goes here
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [curEvents,setCurEvents]=useState([]);
  const options = [
    { value: "General Events", label: "General Events" },
    { value: "Dance", label: "Dance" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
    { value: "Board Games", label: "Board Games" },
    { value: "Photography", label: "Photography" },
    { value: "Gaming", label: "Gaming" },
    { value: "Quiz", label: "Quiz" },
    { value: "Art", label: "Art" },
    { value: "Cookery", label: "Cookery" },
    { value: "Movie/Anime", label: "Movie/Anime" },
    {value:"All",label:"All"}
  ];

  useEffect(() => {
    // Your code here
    const getData = async () => {
      await getDocs(collection(db, "events")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(newData.filter((event) => event.cat === "Cultural"));
        setCurEvents(newData.filter((event) => event.cat === "Cultural"));
        wait(1000);
        setLoaded(true);
      });
    };
    getData();
  }, []);

  const handleChangeCategory = (category) => {
    if(category==="All"){
      setCurEvents(events);
    }
    else {
      setCurEvents(events.filter((event) => event.subcat === category));
    }
  }

  return (
    <div className="bg-cover bg-fixed bg-no-repeat h-auto min-h-screen bg-gradient-to-b from-gray-900 to-black w-full px-5">
      <div className="flex justify-center items-center pt-32">
        <h1 className="text-white text-6xl font-pop sm:text-7xl tracking-widest">
          CULTURAL
        </h1>
      </div>
      <div className="flex justify-center my-10">
        <div className="max-w-md w-full space-y-10">
          {/* Search Component Placeholder */}
          <div className="mt-10">
            <div className="relative">
              <select
                onChange={(item) => {
                  handleChangeCategory(item.target.value);
                }}
                className="peer h-full w-full rounded-lg bg-transparent px-3 py-2 text-sm font-normal text-white outline-none border border-gray-700 focus:ring-2 focus:ring-gray-500"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-5 text-xs text-gray-400 transition-all  peer-focus:-top-5 peer-focus:text-gray-200 peer-focus:text-xs">
          
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-4 my-12">
        {loaded ? (
          curEvents.map((event, index) => (
            <Suspense fallback={<Loader />} key={index}>
              <div className=" hover:scale-110 transition duration-200 cursor-pointer rounded-2xl m-4">
                  <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
                    <img
                      className="w-full h-fit "
                      src={event.imgurl}
                      alt="Sunset in the mountains"
                    />
                </div>
              </div>
            </Suspense>
          ))
        ) : (
          <div className="text-center">{/* Loader Placeholder */}</div>
        )}
      </div>
    </div>
  );
};

export default Cultural;
