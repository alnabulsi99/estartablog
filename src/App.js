import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Index = lazy(() => import('./components/navbar'));
const Blog = lazy(() => import('./components/bloglist'));
const Blog1 = lazy(() => import('./components/newBlog'));
const SingleBlog = lazy(() => import('./components/SingleBlog'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <>
      <Helmet>
        <title>Estarta Blog</title>
      </Helmet>
      <BrowserRouter>
          <Index />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/Create' element={<Blog1 />} />
            <Route path='/' element={<Blog />} />
            <Route path='/SingleBlog/:id' element={<SingleBlog />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
