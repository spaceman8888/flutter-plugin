import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layouts/root-layout';
import Sample from '@/pages/samplePage/Sample';
import Home from '@/pages/samplePage/Home';
import Login from '@/pages/samplePage/Login';
import SampleDeep from '@/pages/samplePage/SampleDeep';

export const router = createBrowserRouter([
  // {
  //     path:"/index.html",
  //     children:[{index:true, Component:Home}]
  // },
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      {
        path: 'sample',
        // Component: Sample,
        children: [
          { index: true, Component: Sample },
          { path: 'deep', Component: SampleDeep },
        ],
      },
    ],
  },
]);
