import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useHref,
  useNavigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { NextUIProvider } from '@nextui-org/react';

import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import UiSettings from './pages/UiSettings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import GlobalStyle from './styles/GlobalStyle';
import Categories from './pages/Categories';
import AddProduct from './pages/AddProduct';
import EditProduct from './features/allProducts/EditProduct';
import UiHomePage from './pages/UiHomePage';
import Rates from './pages/Rates';
import Brands from './pages/Brands';
import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyle />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#27272a',
            color: '#ECEDEE',
          },
        }}
      />
    </QueryClientProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<Orders />} />
          <Route path='rates' element={<Rates />} />
          <Route path='products' element={<AllProducts />} />
          <Route path='products/categories' element={<Categories />} />

          <Route
            path='products/:productIdentify/:action'
            element={<EditProduct />}
          />

          <Route path='products/platforms' element={<Brands />} />
          <Route path='products/new' element={<AddProduct />} />
          <Route path='uisettings' element={<UiSettings />} />
          <Route path='uisettings/homepage' element={<UiHomePage />} />
          <Route path='users' element={<Users />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
