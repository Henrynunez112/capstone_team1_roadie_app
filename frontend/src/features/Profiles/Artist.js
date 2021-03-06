import React from "react";
import ArtistProfile from "../Artist/ArtistProfile";
import UploadPictureModal from "../Portfolio/UploadPictureModal";
import UploadVideoModal from "../Portfolio/UploadVideoModal";
import EditArtistProfileForm from "../Artist/EditArtistProfileForm";
import BookMeForm from "../Artist/BookMeForm";
import "../../css/Profiles/Artist.css";
import EditArtistProfilePicForm from "../Artist/EditArtistProfilePicForm";

const Artist = () => {
  return (
    <div className="realArtistProfile container">
      <div className="row justify-content-md-center">
        <ArtistProfile />
      </div>
      <div className="row">
        <UploadPictureModal />
      </div>
      <div className="row">
        <UploadVideoModal />
      </div>
      <div className="row">
        <BookMeForm />
      </div>

      <EditArtistProfileForm />

      <EditArtistProfilePicForm />
    </div>
  );
};

export default Artist;
