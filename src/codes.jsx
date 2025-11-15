import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Content from "./content";
import { useState, useEffect } from "react";
import SkeletonCard from "./SkeletonCard";
import { SiDragonframe } from "react-icons/si";

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          <Navbar />
          <Content />
        </>
      )}
    </div>
  );
}



SiDragonframe
import { FaVideo } from "react-icons/fa"
import { FaGuilded } from "react-icons/fa"
import { FcSupport } from "react-icons/fc"
import { FaPassport } from "react-icons/fa"
import { BsGeoAltFill } from "react-icons/bs"
import { MdSettings } from "react-icons/md"
import { BiMenu } from "react-icons/bi"


export default function Sidebar(){
return(

<div className=" bg-pink-200 h-full  bg-white gap-5  text-sm  w-9 ml-0 absolute">
<FaVideo className="text-sm ml-4 mt-10"  /><p className="ml-4">video</p>
<FaGuilded className="text-4sm ml-4 mt-10" /><p className="ml-4">sport</p>
<FcSupport className="text-4sm ml-4 mt-10" /><p className="ml-4">audio</p>
<FaPassport className="text-4sm ml-4 mt-10" /><p className="ml-4"></p>
<BsGeoAltFill className="text-4sm ml-4 mt-10" /><p className="ml-4"></p>
<FcSupport className="text-4sm ml-4 mt-10" /><p className="ml-4"></p>
<FaPassport className="text-4sm ml-4 mt-10" /><p className="ml-4"></p>
<BsGeoAltFill className="text-4sm ml-4 mt-10" /><p className="ml-4"></p>




</div>



)




}




<routes>
      <Route path="/" element={<Home>}
        <Route path="/" element={<Home>}
      </routes>

