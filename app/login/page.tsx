'use client';

import { useState } from 'react';
import { ListBuddySVG } from '../../components/graphics/listbuddy-svg';
import { LoginForm } from '../../components/LoginForm';

function LoginPage () {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO: maybe work on some encryption for these details? lol
        body: JSON.stringify(values),
      });
  
      if (!response.ok || response.status !== 200) {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
        setLoading(false);
        return;
      }
  
      const data = await response.json();

      // TODO: Consider maybe using cookies? idk. we want to encrypt all the data anyways
      //       Also rework the way we are storing this data wtf
      sessionStorage.setItem('user', JSON.stringify(data.user));
      // console.log('Logged in successfully:', data);

      // TODO: Do something here
      window.location.href = '/home';

    } catch (err) {
      console.error('An error occurred during login:', err);
      setError('Failed to log in.');
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen bg-zinc-100 relative overflow-hidden">
      <div className="flex items-center justify-center h-full relative z-10">
        <LoginForm
          onSubmit={handleSubmit} serverLoading={loading} serverError={error}
        />
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