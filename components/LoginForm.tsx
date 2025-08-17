// TODO: Fix up parameters and figure out what to do with this whole form
//      It's tightly coupled with the login logic so we will have to rearrange some stuff
//      Let's think in terms of scope for these variables and the logic/data flow
import { Button } from './inputs/button-input';
import { CheckBox } from './inputs/checkbox-input';
import { TextInput } from './inputs/text-input';

/**
 * Represents configuration options for a Login form
 */
interface LoginFormOptions {
    handleSubmit: (e: any) => void;
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
    loading: boolean;
}

/**
 * Renders a login form that takes in react state variables and functionsfor controlling data flow
 * 
 * @param loginFormOptions Options for configuring this component
 * @returns React form component
 */
function LoginForm(loginFormOptions: LoginFormOptions) {
  const {
    handleSubmit,
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading
  } = loginFormOptions;
    
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
      />
      <TextInput
        label="Password"
        id="password"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <div className="mb-4 flex justify-between items-center">
        <CheckBox
          id="remember-me"
          name="remember"
          label="Remember Me"
        />

        <a href="#" className="text-sm text-blue-500 hover:underline">
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

export { LoginForm };