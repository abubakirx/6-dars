import { Fragment } from "react";
import { useCollection } from "../hooks/use.collection";

function Home() {
  const { data: users } = useCollection("users");

  if (!users) {
    return <h1 className="text-3xl">Loading...</h1>;
  }
  return (
    <div>
      {users &&
        users.map((user) => {
          return (
            <Fragment key={user.id}>
              {user.online && (
                <div className="avatar avatar-online">
                  <div className="w-24 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
              )}
              {user.online && (
                <div className="avatar avatar-offline">
                  <div className="w-24 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
    </div>
  );
}

export default Home;
