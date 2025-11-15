import { FaSearch } from "react-icons/fa";
import Cardi from "./crd";
import Card from "./Card";

const projects = [
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "health", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800", content: "mental", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", content: "physical", likes: 92, views: "7.6k" },
  { image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800", content: "wellness", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=800", content: "sport", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800", content: "leisure", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", content: "protect", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "diseases", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800", content: "health", likes: 92, views: "7.6k" },
  { image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", content: "protec", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "disease", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800", content: "health", likes: 92, views: "7.6k" },
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "health", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800", content: "mental", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", content: "physical", likes: 92, views: "7.6k" },
  { image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800", content: "wellness", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1532798442725-41036acc7489?w=800", content: "sport", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800", content: "leisure", likes: 7, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", content: "protect", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "diseases", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800", content: "health", likes: 92, views: "7.6k" },
  { image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", content: "protec", likes: "70k", views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", content: "disease", likes: 132, views: "8.8k" },
  { image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800", content: "health", likes: 92, views: "7.6k" }
];




export default function Content() {
  return (
      <div className="px-12 mt-15 font-poppins ">
    
      <div className="flex flex-col lg:flex-row  items-center gap-10 mt-10">
        
        <div className="flex-1 mt-20">
          <h1 className="text-4xl font-bold text-black mb-6 leading-snug">
            Get started with best advice for <br /> your Health
          </h1>
          <p className="text-black mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
            quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button className="bg-[#8E36CF] text-white text-xl px-6 py-2 rounded cursor-pointer hover:scale-105 transition-transform mb-6">
            Join now
          </button>

        
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Discover everything here!!"
              className="w-full h-12 rounded-[10px] bg-[#A6A09F]/30 pl-4 pr-12 border border-gray-300 outline-none focus:ring-2 focus:ring-[#8E36CF]"
            />
            <FaSearch className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer" />
          </div>
        </div>

        
        <div className="flex-1 flex justify-center">
          <img
            src="/woman.png"
            alt="Woman"
            className="w-[700px] h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      
      <main className="mt-20">
        
        <div className="flex flex-wrap  justify-between bg-white shadow px-6 py-4 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800">Discover</h1>

          <div className="flex  gap-12  text-gray-600 font-medium">
            <a href="#">Advices</a>
            <a href="#">Mental</a>
            <a href="#">Physical</a>
            <a href="#">Diseases</a>
            <a href="#">Protection</a>
            <a href="#">Wellness</a>
            <a href="#">Sport</a>
            <a href="#">Leisure</a>
            <button className="border px-3 py-1 rounded-lg hover:bg-gray-100 transition">
              Filters
            </button>
            
          </div>
        </div>

        
        <div className="mt-[-5px] grid grid-cols-2 p-9  text-sm sm:grid-cols-4 lg:grid-cols-5 gap-9">
          {projects.map((project, index) => (
            <Card key={index} {...project} />
            
          ))}
        </div>
      </main>
      
      
    </div>
  );
}
