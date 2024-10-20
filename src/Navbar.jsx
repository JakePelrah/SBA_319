import { Outlet } from "react-router-dom";

export default function Navbar(){

    return(
    <>
    <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img src="icons/bank.svg" alt="Bank logo" class="me-2 d-inline-block align-text-top"/>
            My Bank
          </a>
        </div>
      </nav>
      <Outlet/>
      </>
      )
}