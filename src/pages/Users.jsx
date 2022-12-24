import React, { useEffect, useState } from "react";
import heart from "../UI/img/heart.png";
import sort from "../UI/img/sort.png";
import reverse from "../UI/img/reverse.png";
import { NavLink } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { gotUsersAc, setUsersAc } from "../redux/reducer";
import User from "./User";

const Users = () => {
  const [usersLocal, setUsersLocal] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [sortDesc, setSortDesc] = useState(false);

  const users = useSelector((state) => state.users);
  const gotUsers = useSelector((state) => state.gotUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });

        if (isMounted) {
          setUsersLocal(response.data.data);
          dispatch(setUsersAc(response.data.data));
          dispatch(gotUsersAc());
        }
      } catch (e) {
        console.error(e.message);
      }
    };

    if (!gotUsers) {
      getUsers();
      console.log("from usersss ");
    } else {
      localStorage.setItem("users", JSON.stringify(users));
      setUsersLocal(JSON.parse(localStorage.getItem("users")));
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [sortAsc, sortDesc, users]);

  return (
    <section className="wrapper" style={{ marginTop: "30px" }}>
      <div style={{ display: "grid", gridTemplateColumns: ".8fr 1fr" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: "5px", borderRadius: "6px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          style={{
            justifySelf: "end",
            display: "flex",
            columnGap: "15px",
            alignItems: "center",
          }}
        >
          <NavLink to={"/favorites"}>
            <img src={heart} alt="favorites" />
          </NavLink>
          <button
            className={!sortAsc ? "btn" : "btn active"}
            onClick={() => {
              if (!sortAsc && sortDesc) {
                setSortAsc(!sortAsc);
                setSortDesc(!sortDesc);
              } else {
                setSortAsc(!sortAsc);
              }
            }}
          >
            <img src={sort} alt="a-z" />
          </button>
          <button
            className={!sortDesc ? "btn" : "btn active"}
            onClick={() => {
              if (sortAsc && !sortDesc) {
                setSortDesc(!sortDesc);
                setSortAsc(!sortAsc);
              } else {
                setSortDesc(!sortDesc);
              }
            }}
          >
            <img src={reverse} alt="z-a" />
          </button>
        </div>
      </div>

      <div className="users">
        {!search && !sortAsc && !sortDesc
          ? usersLocal.map((user) => {
              if (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
              )
                return (
                  <User
                    user={user}
                    detailsOpen={false}
                    isFavorite={user.isFavorite}
                  />
                );
            })
          : search
          ? usersLocal
              .sort((a, b) => {
                let fa = a.firstName.toLowerCase();
                let fb = b.firstName.toLowerCase();
                return fa < fb ? -1 : fa > fb ? 1 : 0;
              })
              .map((user) => {
                if (
                  user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(search.toLowerCase())
                )
                  return (
                    <User
                      user={user}
                      detailsOpen={false}
                      isFavorite={user.isFavorite}
                    />
                  );
              })
          : sortAsc
          ? usersLocal
              .sort((a, b) => {
                let fa = a.firstName.toLowerCase();
                let fb = b.firstName.toLowerCase();
                return fa < fb ? -1 : fa > fb ? 1 : 0;
              })
              .map((user) => {
                if (
                  user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(search.toLowerCase())
                )
                  return (
                    <User
                      user={user}
                      detailsOpen={false}
                      isFavorite={user.isFavorite}
                    />
                  );
              })
          : sortDesc
          ? usersLocal
              .sort((a, b) => {
                let fa = a.firstName.toLowerCase();
                let fb = b.firstName.toLowerCase();
                return fa < fb ? -1 : fa > fb ? 1 : 0;
              })
              .reverse()
              .map((user) => {
                if (
                  user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(search.toLowerCase())
                )
                  return (
                    <User
                      user={user}
                      detailsOpen={false}
                      isFavorite={user.isFavorite}
                    />
                  );
              })
          : usersLocal.map((user) => {
              if (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  <User
                    user={user}
                    detailsOpen={false}
                    isFavorite={user.isFavorite}
                  />
                );
              }
            })}
      </div>
    </section>
  );
};

export default Users;
