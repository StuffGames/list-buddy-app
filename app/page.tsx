// We should just reroute to the login page if not signed in...
// Otherwise route to the home page

"use client";

// TODO: login checks, rn just reroute to login page automatically
const MainPage = () => {
    window.location.href = "/login";

    return (<></>);
};

export default MainPage;