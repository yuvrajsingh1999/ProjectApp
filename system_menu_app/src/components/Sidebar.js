
import { createContext, useContext } from "react";
import {ChevronLeft , ChevronRight} from "../assets/IconSvgs";
import { Link } from "react-router-dom";
import {
  atom,
  useRecoilState,
} from 'recoil';
import {APP_NAME} from "../Env";


const SidebarContext = createContext();
const setExpanded = atom({
  key: 'setExpanded', 
  default: true, 
});
export default function Sidebar({ children }) {
  const [expanded, setExpand] = useRecoilState(setExpanded);

    return (
        <>
            <aside className="h-screen">
                <nav className={`h-full ${expanded ? "w-60" : ""} flex flex-col bg-slate-800 border-r shadow-sm rounded-3xl`}>
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <span className="text-white">{expanded ? `${APP_NAME}` : ""}</span>
                        <button onClick={() => setExpand((curr) => !curr)}>
                            {expanded ? <ChevronLeft /> : <ChevronRight />}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                    
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert, children, link }) {
    const { expanded } = useContext(SidebarContext)
    const dropdown = () => {
        if (text === "System") 
            document.querySelector("#submenu").classList.toggle("hidden");
    }
    return (
    <>
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-[#a3e635] to-[#a3e635] text-gray-900" : "hover:bg-[#a3e635] text-gray-500"}`} onClick={dropdown} >
        <Link to={link} style={{ display: 'flex'}}>
            {icon}
            <span sidebar-toggle-item className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 displayNone"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 w-52 text-gray-500 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`} >
                    {text}
                </div>
            )}
            
        
        </Link>
        </li>
        { text==="System" && (
        <SidebarContext.Provider value={{ expanded }}>

                        <div
        class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        id="submenu"
      >{children}</div>
    </SidebarContext.Provider>
    )}
      </>
    )
}

export function SidebarSubItem({ icon, text, active, alert, link }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-[#a3e635] to-[#a3e635] text-gray-900" : "hover:bg-[#a3e635] text-gray-500"}`}>
            <Link to={link} style={{ display: 'flex'}}>
            {icon}
            <span sidebar-toggle-item className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 displayNone"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                </div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 w-52 text-gray-500 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`} >
                    {text}
                </div>
            )}
            </Link>
        </li>
    )
}