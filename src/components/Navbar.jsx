import { Outlet } from "react-router-dom";

export default function Navbar(){

    return(
    <>
    <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="/">
            My Bank
          </a>
        </div>
      </nav>
      <Outlet/>
      </>
      )
}