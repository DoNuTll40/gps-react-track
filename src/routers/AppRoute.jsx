import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Login from "../pages/Login"
import UseAuth from "../hooks/UseAuth"
import { GpsContextProvider } from "../contexts/GpsContext"
import Header from "../components/Header"
import Home from "../pages/Home"
import Footer from "../components/Footer"
import ViewById from "../pages/ViewById"

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Login /> }
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
        <GpsContextProvider>
            <Header />
            <Outlet />
            <Footer />
        </GpsContextProvider>
        </>,
        children: [
            { index: true, element: <Home /> },
            { path: 'view/:id', element: <ViewById /> }
        ]
    }
])

function AppRoute() {
    const { user } = UseAuth();

    const finalRouter = user?.user_id ? userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}

export default AppRoute