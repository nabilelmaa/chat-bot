import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Link to="/chat">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-xs lg:text-sm">
          Start chating
        </button>
      </Link>
    </div>
  );
};

export default Home;
