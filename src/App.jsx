import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import Admins from './pages/Admins';
import Orders from './pages/Orders';
import UiSettings from './pages/UiSettings';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import GlobalStyle from './styles/GlobalStyle';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import SubCategories from './features/categories/SubCategories';
import SubSubCategories from './features/categories/SubSubCategories';
import AddProduct from './pages/AddProduct';
import EditProduct from './features/allProducts/EditProduct';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='admins' element={<Admins />} />
            <Route path='orders' element={<Orders />} />
            <Route path='products' element={<AllProducts />} />
            <Route path='products/categories' element={<Categories />} />
            <Route
              path='products/categories/:subCategoryId'
              element={<SubCategories />}
            />
            <Route
              path='products/categories/:subCategoryId/:subSubCategoryId'
              element={<SubSubCategories />}
            />
            <Route path='products/:productIdentify' element={<EditProduct />} />
            <Route path='products/brands' element={<Brands />} />
            <Route path='products/new' element={<AddProduct />} />
            <Route path='uisettings' element={<UiSettings />} />
            <Route path='users' element={<Users />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
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
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
