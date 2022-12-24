import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emptyHeart from "../UI/img/emptyHeart.png";
import heart from "../UI/img/heart.png";
import address from "../UI/img/address.png";
import internet from "../UI/img/internet.png";
import email from "../UI/img/email.png";
import mobile from "../UI/img/mobile.png";
import UserDetails from "./UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritesAc, setUserAc, removeFavoriteAc } from "../redux/reducer";

const User = ({ user, detailsOpen, isFavorite }) => {
  const [userLocal, setUserLocal] = useState({});
  const favoriteUsers = useSelector((state) => state.favorites);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    user && setUserLocal(user);
    setIsFavoriteLocal(isFavorite);
  }, [user, isFavorite]);

  const showUser = (id) => {
    navigate(`/${id}`);
    dispatch(setUserAc(user));
  };

  return (
    <>
      {!detailsOpen ? (
        <div className="user">
          <img
            src={userLocal.image}
            alt="user image"
            style={{ width: "100%", borderRadius: "5px 5px 0 0" }}
          />
          <div style={{ padding: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                {userLocal.firstName} {userLocal.lastName}
              </p>
              <button
                className="btn"
                onClick={() => { 
                  if (!isFavoriteLocal) {
                    dispatch(setFavoritesAc({ ...userLocal, isFavorite: true }))
                    setIsFavoriteLocal(true);
                  }
                  else {
                    dispatch(removeFavoriteAc({ ...userLocal, isFavorite: false }));
                    setIsFavoriteLocal(false);
                  }

              }}
                // onClick={() => setIsFavoriteLocal(!isFavoriteLocal)
              >
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={
                     isFavoriteLocal ? heart
                      : emptyHeart
                  }
                  alt="favorites"
                />
              </button>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  columnGap: "5px",
                  marginBottom: "5px",
                }}
              >
                <img src={address} alt="address" />
                <p>
                  {userLocal.country}, {userLocal.city}
                </p>
              </div>
              <div className="userData">
                <img src={mobile} alt="mobile phone" />
                <p>{userLocal.phoneNumber}</p>
              </div>
              <div className="userData">
                <img src={internet} alt="website" />
                <p>{userLocal.website}</p>
              </div>
              <div className="userData">
                <img src={email} alt="email" />
                <p>{userLocal.email}</p>
              </div>
            </div>
            <button className="btn btn-show" onClick={() => showUser(user.id)}>
              Show
            </button>
          </div>
        </div>
      ) : (
        <UserDetails isFavorite={isFavorite}/>
      )}
    </>
  );
};

export default User;
