import React, { ReactElement, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  return (
    <div className='min-h-screen flex item-center bg-bgurl'>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-lg mx-auto'>
       <div></div>
        <div className="p-4 flex flex-col justify-center items-center md:items-end">
          <div className='w-full md:w-4/5'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout