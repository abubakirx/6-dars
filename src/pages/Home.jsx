import { useCollection } from "../hooks/use.collection";
import { formatLastSeen } from "../utils";

function Home() {
  const { data: users } = useCollection("users");

  if (!users) {
    return <h1 className="text-3xl text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {users.map((user) => {
        const isOnline = user.online;
        let statusText;

        if (isOnline) {
          statusText = "🟢 Online";
        } else if (user.lastSeen && user.lastSeen.seconds) {
          // faqat lastSeen mavjud va to‘g‘ri formatda bo‘lsa
          statusText = `⏱ Oxirgi marta ${formatLastSeen(user.lastSeen)}`;
        } else {
          statusText = "❌ Vaqt mavjud emas";
        }

        return (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center transition hover:scale-105 duration-200"
          >
            <div
              className={`avatar ${
                isOnline ? "avatar-online" : "avatar-offline"
              }`}
            >
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt={user.displayName || "User"} />
              </div>
            </div>
            <h2 className="mt-3 font-semibold text-lg">
              {user.displayName || "No Name"}
            </h2>
            <p
              className={`text-sm mt-1 ${
                isOnline ? "text-green-600" : "text-gray-500"
              }`}
            >
              {statusText}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
