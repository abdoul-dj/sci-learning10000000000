import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Content from "./content";
import { useState, useEffect } from "react";
import SkeletonCard from "./SkeletonCard";

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
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
