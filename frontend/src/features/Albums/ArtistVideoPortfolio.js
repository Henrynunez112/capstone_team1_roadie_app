import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import SoundCloud from "../images/VideoIcons/iconfinder_SoundCloud_2062090.png";
import FaceBook from "../images/VideoIcons/iconfinder_square-facebook_317727.png";
import Twitch from "../images/VideoIcons/iconfinder_twitch_3069707.png";
import Vimeo from "../images/VideoIcons/iconfinder_Vimeo_381370.png";
import YouTube from "../images/VideoIcons/iconfinder_youtube_1220360.png";
import Unknown from "../images/VideoIcons/iconfinder_secret_secure_hack_unknown_files_4852564.png";
import BackButton from "../BackButton/BackButton";

const ArtistVideoPortfolio = () => {
  const [videos, setVideos] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const API = apiURL();
  const match = useRouteMatch();

  const getUser = async (id) => {
    try {
      let res = await axios.get(`${API}/artists/${id}`);
      setUserInfo(res.data.body.single_artist);
    } catch (err) {
      console.log(err);
    }
  };
  
  const imgSize = {
    height: "auto",
    width: "100px",
  };
  const sourceVideo = (el) =>{
    switch (el) {
      case "YouTube":
        return <img src={YouTube} style={imgSize} />
        break;
      case "Vimeo":
        return <img src={Vimeo} style={imgSize} />
        break;
      case "Facebook":
        return <img src={FaceBook} style={imgSize} />
        break;
      case "SoundCloud":
        return <img src={SoundCloud} style={imgSize}/>
        break;
      case "Twitch":
        return <img src={Twitch} style={imgSize}/>
        break;
      default:
        return <img src={Unknown} style={imgSize}/>
    }
  } 


  useEffect(() => {
    const fetchUsersVideoAlbum = async (artist_id) => {
      let res = await axios.get(`${API}/media/videos/artist/${artist_id}`);
      setVideos(res.data.body.video);
    };
    getUser(match.params.artist_id);
    fetchUsersVideoAlbum(match.params.artist_id);
  }, []);
  const getUsersVideo = videos.map((video) => {
   
    return (
      <li>
        <div className="eachPhoto">
          <a
            value={video.url}
            data-target="#videoTarget"
            data-toggle="modal"
            onClick={() => {
              history.push(
                `/media/videos/artist/${match.params.artist_id}/video/${video.id}`
              );
            }}
          >
            <p id="imgCaption">{video.caption}</p>
            {sourceVideo(video.source)}
            <p id="vidSource">{video.source}</p>
            {}
          </a>
        </div>
      </li>
    );
  });

  return (
    <div className="container userAlbums">
    <div>
      <BackButton />
    </div>
      <div className="jumbotron albumJumbo text-center">
        <h2 id="usersAlbumHeader" className="display-4">
          {userInfo.name}'s Portfolio
        </h2>
        <ul className="allPhotos">{getUsersVideo}</ul>
      </div>
    </div>
  );
};
export default ArtistVideoPortfolio;
