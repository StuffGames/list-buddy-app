 const Login=() => {
    return (
        <div className="h-screen bg-zinc-100 relative overflow-hidden">

            {/* Form Content */}
            <div className="flex items-center justify-center h-full relative z-10">
                <form className="bg-white p-8 rounded-2xl w-96 shadow-lg">
                    <h1 className="text-center text-2xl text-slate-700 font-medium mb-4">
                        Welcome Back to
                    </h1>
                    <h1 className="text-center text-2xl text-blue-500 font-extrabold mb-4">
                        ListBuddy!
                    </h1>
                    <p className="text-center text-sm mb-6 text-slate-500">Login here:</p>

                    <div className="mb-4">
                        <label
                            htmlFor="fname"
                            className="block text-sm font-medium text-slate-500"
                        >
                            Username
                        </label>
                        <input
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-500"
                        >
                            Password
                        </label>
                        <input
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            className="w-4 h-4 mr-2"
                            type="checkbox"
                            id="remember-me"
                            name="remember"
                        />
                        <label htmlFor="remember-me" className="text-sm text-slate-500">
                            Remember Me
                        </label>
                    </div>

                    <div className="mb-6">
                        <input
                            className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                            type="submit"
                            value="Submit"
                        />
                    </div>

                    <div className="text-center">
                        <a
                            href="forgot-password.html"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
            <CornerSVG />
        </div>
    );
};

const CornerSVG = () => {
    return (
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-[150px] scale-75 rotate-[-30deg] overflow-hidden">
        <svg
        width="681" height="1077" viewBox="0 0 681 1077" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="96.81" y="181.885" width="486.984" height="305.098" rx="17.6018" fill="white" stroke="black" strokeWidth="35.2036" />
        <rect x="17.6019" y="557.391" width="645.4" height="501.652" rx="17.6018" fill="white" stroke="black" strokeWidth="35.2036" />
        <line x1="88.0091" y1="398.974" x2="589.661" y2="398.974" stroke="black" strokeWidth="35.2036" />
        <line x1="184.819" y1="381.373" x2="184.819" y2="504.585" stroke="black" strokeWidth="35.2036" />
        <line x1="569.125" y1="686.471" x2="199.487" y2="686.471" stroke="black" strokeWidth="35.2036" />
        <line x1="569.125" y1="800.883" x2="199.487" y2="800.883" stroke="black" strokeWidth="35.2036" />
        <line x1="569.125" y1="912.361" x2="199.487" y2="912.361" stroke="black" strokeWidth="35.2036" />
        <line x1="504.585" y1="381.373" x2="504.585" y2="504.585" stroke="black" strokeWidth="35.2036" />
        <line x1="393.107" y1="381.373" x2="393.107" y2="504.585" stroke="black" strokeWidth="35.2036" />
        <line x1="287.496" y1="381.373" x2="287.496" y2="504.585" stroke="black" strokeWidth="35.2036" />
        <line x1="340.302" y1="64.54" x2="340.302" y2="187.753" stroke="black" strokeWidth="35.2036" />
        <circle cx="126.146" cy="686.471" r="30.8032" fill="black" stroke="black" strokeWidth="2.93364" />
        <circle cx="126.146" cy="800.883" r="30.8032" fill="black" stroke="black" strokeWidth="2.93364" />
        <circle cx="126.146" cy="912.361" r="30.8032" fill="black" stroke="black" strokeWidth="2.93364" />
        <circle cx="491.384" cy="286.029" r="44.0045" fill="black" stroke="black" strokeWidth="2.93364" />
        <path d="M385.773 45.4714C385.773 69.7308 365.459 89.4759 340.302 89.4759C315.144 89.4759 294.83 69.7308 294.83 45.4714C294.83 21.2119 315.144 1.46682 340.302 1.46682C365.459 1.46682 385.773 21.2119 385.773 45.4714Z" fill="black" stroke="black" strokeWidth="2.93364" />
        <path d="M155.165 297.932C159.498 288.932 175.865 270.932 206.665 270.932C237.465 270.932 256.498 288.932 262.165 297.932" stroke="black" strokeWidth="41" strokeLinecap="round" />

        </svg>
      </div>
    );
  };

export default Login