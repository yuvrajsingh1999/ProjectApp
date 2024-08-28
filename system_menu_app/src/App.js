import logo from './logo.svg';
import './App.css';
import Sidebar, { SidebarItem, SidebarSubItem } from "./components/Sidebar";
import {SolidSquares , OutlinedSquares, SolidFolder, OutlinedFolder} from "./assets/IconSvgs";
import {Routes, Route } from "react-router-dom";
import SystemCode from "./components/Pages/SystemCode";
import UserGroup from "./components/Pages/UserGroup";
import Properties from "./components/Pages/Properties";
import Menus from "./components/Pages/Menus";
import Competition from "./components/Pages/Competition";
import ApiLists from "./components/Pages/ApiLists";

function App() {
  return (
    <>
      <div className="flex p-6">
        <Sidebar>
          <SidebarItem icon={<SolidFolder/>} text="System">
          <SidebarSubItem icon={<SolidSquares/>} text="System Code" link="/"/>
          <SidebarSubItem icon={<SolidSquares/>} text="Properties" link="/properties"/>
          <SidebarSubItem icon={<SolidSquares/>} text="Menus" link="/menus"/>
          <SidebarSubItem icon={<SolidSquares/>} text="API Lists" link="/api-lists"/>
          </SidebarItem>
          <hr className="my-3" />
          <SidebarItem icon={<OutlinedFolder/>} text="Users & Group" link="/user-group"/>
          <SidebarItem icon={<OutlinedFolder/>} text="Competition" link="/competition"/>
        </Sidebar>

        <NavRoute />
      </div>
    </>
  );
}

function NavRoute() {
  return (
      <Routes>
          <Route path="/" element={<SystemCode />} />
          <Route path="/user-group" element={<UserGroup />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/api-lists" element={<ApiLists />} />
        
      </Routes>
  );
}

export default App;
