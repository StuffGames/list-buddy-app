import { Button } from './inputs/button-input';
import { CheckBox } from './inputs/checkbox-input';
import { TextInput } from './inputs/text-input';
import { useState } from 'react';
 

/**
 * Renders a login form that takes in react state variables and functionsfor controlling data flow
 * 
 * @param loginFormOptions Options for configuring this component
 * @returns React form component
 */
export function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // TODO: Uncomment and implement into login
  // const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO: maybe work on some encryption for these details? lol
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (!response.ok || response.status !== 200) {
        setError(data.message || 'Something went wrong.');
        setLoading(false);
        return;
      }

      // TODO: Consider maybe using cookies? idk. we want to encrypt all the data anyways
      //       Also rework the way we are storing this data wtf
      sessionStorage.setItem('user', JSON.stringify(data.user));
      // console.log('Logged in successfully:', data);

      // TODO: Do something here
      window.location.href = '/home';

    } catch (err) {
      console.error('An error occurred during login:', err);
      setError('Failed to log in.');
    }
    setLoading(false);
  };

    
  return (
    <form
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-2xl w-96 shadow-lg"
    >
      <h1 className="text-center text-2xl text-slate-700 font-medium mb-4">
        Welcome Back to
      </h1>
      <h1 className="text-center text-2xl text-blue-500 font-extrabold mb-4">
        ListBuddy!
      </h1>
      <TextInput
        label="Username"
        id="username"
        value={username}
        placeholder="Enter your username"
        onChange={(e: any) => setUsername(e.target.value)}
        required={true}
      />
      <TextInput
        label="Password"
        id="password"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e: any) => setPassword(e.target.value)}
        required={true}

      />
      <div className="mb-4 flex justify-between items-center">
        <CheckBox
          id="remember-me"
          name="remember"
          label="Remember Me"
        />

        <a href="/signup" className="text-sm text-blue-500 hover:underline">
          Sign Up
        </a>
      </div>

      <Button
        id="submit-button"
        name="button"
        type="submit"
        value={loading ? 'Logging in...' : 'Submit'}
        disabled={loading}
      />
      {error && <p className="text-center text-red-500">{error}</p>}
            
      <div className="text-center">
        <a
          href="#"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
}