import { useState } from "react";

import Modal from "./Modal";
import { Cookies, useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [shoModal, setShoModal] = useState(false);

  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShoModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {shoModal && (
        <Modal mode="create" setShoModal={setShoModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
