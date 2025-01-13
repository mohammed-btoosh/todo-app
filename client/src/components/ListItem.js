import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [shoModal, setShoModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        setShoModal(false);
        getData();
        console.log("dlete is ok ");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button
          className="edit"
          onClick={() => {
            setShoModal(true);
          }}
        >
          EDIT
        </button>
        <button className="delete" onClick={handleDelete}>
          DELETE
        </button>
      </div>
      {shoModal && (
        <Modal
          mode="edit"
          setShoModal={setShoModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};

export default ListItem;
