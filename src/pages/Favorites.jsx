import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "./User";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  return (
    <section className="wrapper" style={{ marginTop: "30px" }}>
      <div className="users">
        {[...new Map(favorites.map(f => [f.id, f])).values()].map((user) => {
          return <User user={user} detailsOpen={false} isFavorite={user.isFavorite}/>;
        })}
      </div>
    </section>
  );
};

export default Favorites;
