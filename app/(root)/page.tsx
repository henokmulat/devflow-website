import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log("session----", session);
  return (
    <div>
      <h1 className="text-3xl ">Welcome to Next js 👋</h1>
    </div>
  );
};

export default Home;
