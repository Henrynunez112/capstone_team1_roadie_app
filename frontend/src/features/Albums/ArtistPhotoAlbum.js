import React, { useEffect, useState, useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import "../../css/PhotoAlbum.css";

const ArtistPhotoAlbum = () => {
  const [pictures, setPictures] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const API = apiURL();
  const match = useRouteMatch();

  const getUser = async (id) => {
    try{
      let res = await axios.get(`${API}/artists/${id}`);
      setUserInfo(res.data.body.single_artist)
      debugger
    }catch(err){
      console.log(err)
      
    }
    
  };
  useEffect(() => {
    const fetchUsersPhotoAlbum = async (artist_id) => {
      let res = await axios.get(`${API}/media/pictures/artist/${artist_id}`);
      setPictures(res.data.body.picture);
    };
    getUser(match.params.artist_id);
    fetchUsersPhotoAlbum(match.params.artist_id);
    debugger
  }, []);

  const imgSize = {
    height: "auto",
    width: "200px",
  };

  const getUsersPictures = pictures.map((picture) => {
    debugger
    return (
      <li>
        <div className="eachPhoto">
          <img
            style={imgSize}
            alt={picture.caption}
            src={picture.url}
            id="singlePhoto"
          />
          <p id="imgCaption">{picture.caption}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="container-fluid position-absolute userAlbums">
      <div className="row justify-content-center">
        <h2 id="usersAlbumHeader">{userInfo.name}'s Album</h2>
      </div>
      <div className="jumbotron albumJumbo text-center">
        <ul className="allPhotos">{getUsersPictures}</ul>
      </div>
    </div>
  );
};
export default ArtistPhotoAlbum;
