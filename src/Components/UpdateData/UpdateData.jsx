import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import upload from "../../upload";
import "./UpdateData.css";
import Loading from "../loading/Loading"
import Success from "../loading/Success";

const API_URL = import.meta.env.VITE_API_URL;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const postedDate = `Posted on ${monthNames[month]} ${day}, ${year}   `;

const UpdateData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appName, setAppName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [appLink, setAppLink] = useState("");
  const [installProess, setInstallProcess] = useState("");
  const [video1, setVideo1] = useState("");
  const [video2, setVideo2] = useState("");
  const [video3, setVideo3] = useState("");
  const [hotDeal, setHotDeal] = useState(false);
  const [logo, setLogo] = useState(null);
  const [poster, setPoster] = useState(null);
  const [slideImages, setSlideImages] = useState([]);
  const [video4, setVideo4] = useState("");
  const logoRef = useRef();
  const posterRef = useRef();
  const slidesRef = useRef();

  const logOut = () => {
    localStorage.removeItem('OWNER_LOGIN')
  }

  const setDafaultData = () => {
    setAppName("");
    setCategoryName("");
    setAppLink("");
    setInstallProcess("");
    setVideo4("");
    setVideo3("");
    setVideo1("");
    setVideo2("");
    setHotDeal(false);
    logoRef.current.value = "";
    posterRef.current.value = "";
    slidesRef.current.value = "";
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const logoUrl = await upload(logo);
    const posterUrl = await upload(poster);
    let slideImgArr = [];
    for (let i in slideImages) {
      const img = await upload(slideImages[i]);
      slideImgArr.push(img);
    }
    try {
      await axios.post(API_URL, {
        appName: appName,
        categoryName: categoryName,
        appLink: appLink,
        installProess: installProess,
        videoLinks: [video1, video2, video3, video4],
        hotDeal: hotDeal,
        logo: logoUrl,
        poster: posterUrl,
        slideImages: slideImgArr,
        postedDate: postedDate,
      });
      setDafaultData();
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }, [success]);
  const onchangeHandler = (event, updataData) => {
    updataData(event.target.value);
  };

  const handleFileChange = (e, setData) => {
    const file = e.target.files[0];
    setData(file);
  };

  const hotDealChangeHandler = (e) => {
    if (e.target.checked == true) {
      setHotDeal(true);
      return;
    }
    setHotDeal(false);
  };
  const slidImageHandler = (e) => {
    setSlideImages(e.target.files);
  };
  return (
    <>
      {isLoading && <Loading />}
      {success && <Success />}
      <div className="update-data">
        <form
          method="POST"
          onSubmit={formSubmitHandler}
          action="/upload"
          encType="multipart/form-data"
        >
        <h1>Add Data</h1>
          <div>
            <label htmlFor="input__appName">App Name</label>
            <input
              type="text"
              id="input__appName"
              required
              value={appName}
              onChange={(e) => onchangeHandler(e, setAppName)}
            />
          </div>
          <div>
            <label htmlFor="input__categoryName">Category Name</label>
            <input
              value={categoryName}
              type="text"
              id="input__categoryName"
              onChange={(e) => onchangeHandler(e, setCategoryName)}
              required
            />
          </div>
          <div>
            <label htmlFor="input__appLink">App Link</label>
            <input
              value={appLink}
              type="text"
              id="input__appLink"
              required
              onChange={(e) => onchangeHandler(e, setAppLink)}
            />
          </div>
          <div>
            <label htmlFor="input__intProc">Install Process</label>
            <input
              type="text"
              value={installProess}
              id="input__intProc"
              onChange={(e) => onchangeHandler(e, setInstallProcess)}
            />
          </div>
          <div>
            <label htmlFor="input__rechargeLink">Video 1 Link</label>
            <input
              type="text"
              value={video1}
              id="input__rechargeLink"
              required
              onChange={(e) => onchangeHandler(e, setVideo1)}
            />
          </div>
          <div>
            <label htmlFor="input__withdrawLink">Video 2 Link</label>
            <input
              type="text"
              value={video2}
              id="input__withdrawLink"
              onChange={(e) => onchangeHandler(e, setVideo2)}
            />
          </div>
          <div>
            <label htmlFor="input__installLink">Video 3 Link</label>
            <input
              type="text"
              value={video3}
              id="input__installLink"
              onChange={(e) => onchangeHandler(e, setVideo3)}
            />
          </div>
          <div>
            <label htmlFor="input__installLink">Video 4 Link</label>
            <input
              type="text"
              value={video4}
              id="input__installLink"
              onChange={(e) => onchangeHandler(e, setVideo4)}
            />
          </div>
          <article>
            <label htmlFor="input__hotDeal">HotDeal</label>
            <input
              type="checkbox"
              id="input__hotDeal"
              checked={hotDeal ? true : false}
              onChange={hotDealChangeHandler}
            />
          </article>
          {/* file Inputs */}
          <div>
            <h4>Logo</h4>
            <input
              type="file"
              name="images"
              required
              ref={logoRef}
              onChange={(e) => handleFileChange(e, setLogo)}
            />
          </div>
          <div>
            <h4>Poster</h4>
            <input
              type="file"
              required
              ref={posterRef}
              onChange={(e) => handleFileChange(e, setPoster)}
            />
          </div>
          <div>
            <h4>SlideImages</h4>
            <input
              type="file"
              required
              multiple
              ref={slidesRef}
              onChange={(e) => slidImageHandler(e)}
            />
          </div>

          <button type="submit">ADD</button>
        </form>
        <button className="logout" onClick={logOut}>LOGOUT</button>
      </div>
    </>
  );
};

export default UpdateData;
