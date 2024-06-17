import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useContext, useEffect } from 'react'
import AuthLayout from '../auth';
import MainLayout from '../main';
import { AppContext } from '@/utils/state/app';
import { Modal, Spinner, ModalContent } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps): ReactElement {  

  const router = useRouter();
  const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);

  const routeLayoutHandler = () =>{
    let authPages = [
      '/auth/login',
      '/auth/reset-password',
    ]
    let appPages = [
      // '/', 
      '/home',
      '/shopping',
      'users'
    ]
    
    if(authPages?.includes(router?.route)){
      return "auth"
    }
    if(appPages?.includes(router?.route)){
      return "shopping"
    }
    return "shopping"
  }

  useEffect(() => {
    const handleRouteChangeStart = () => {
      AppDispatch({type:"SET_LOADING_TRUE"});
    };
    const handleRouteChangeComplete = () => {
      AppDispatch({type:"SET_LOADING_FALSE"});
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [AppDispatch, router.events])

  return (
    <div>
      {AppState.isAppLoading&&
        <div className='h-screen w-screen absolute z-[100]'>
          <div className='w-full h-full absolute bg-gray-100 opacity-70'></div>
          <div className='w-full h-full flex items-center justify-center'>
            <Spinner size='lg' />
          </div>
        </div>
      }
      {routeLayoutHandler()!=="auth"&&
        <MainLayout>{children}</MainLayout>
      }
      {routeLayoutHandler()==="auth"&&
        <AuthLayout>{children}</AuthLayout>
      }
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false}  toastStyle={{borderRadius:5}} />
    </div>
  )
}

export default AppLayout