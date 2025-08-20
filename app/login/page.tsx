'use client';

import { ListBuddySVG } from '../../components/graphics/listbuddy-svg';
import { LoginForm } from '../../components/LoginForm';

function LoginPage () {
  
  return (
    <div className="h-screen bg-zinc-100 relative overflow-hidden">
      <div className="flex items-center justify-center h-full relative z-10">
        <LoginForm/>
      </div>
      <CornerSVG />
    </div>
  );
}

const CornerSVG = () => {
  return (
    <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-[150px] scale-75 rotate-[-30deg] overflow-hidden">
      <ListBuddySVG/>
    </div>
  );
};

export default LoginPage;