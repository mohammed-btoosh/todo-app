import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// useContext() to pass props

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  // sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"📝 TODOS CHECKLIST"} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          <ul>
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
