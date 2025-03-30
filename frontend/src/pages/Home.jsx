import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 lg:pl-16">
      <div className="max-w-3xl">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Empower Your Business with <span className="text-blue-500">ERP Solutions</span>
        </h1>
        <p className="mb-8 text-xl text-gray-300 leading-relaxed">
          Streamline operations, boost productivity, and drive growth with our modern ERP system.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;