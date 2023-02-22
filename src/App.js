import "./App.css";
import Index from "./components/navbar";
import Blog from "./components/bloglist";
import useFetch from "./Customhook/useFetch"
import { useEffect , useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog1 from "./components/newBlog";
import { NotFound } from "./components/NotFound";
import SingleBlog from "./components/SingleBlog";
function App() {
  
  return (
    <>
   <BrowserRouter>
      <Index />

      <Routes>
        <Route path="/Create" element={<Blog1 />} />
        <Route path="/" element={<Blog />} />
        <Route path='/SingleBlog/:id' element={<SingleBlog />}/>
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
