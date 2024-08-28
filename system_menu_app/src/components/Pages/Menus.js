
import {ChevronDownArrow} from "../../assets/IconSvgs";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Breadcrumps from "./Breadcrumps";
import { useLocation } from 'react-router-dom';
import {SystemMenuList, MenuList} from "../../assets/DemoData";
import {
  atom,
  useRecoilState,
} from 'recoil';

const systemMenuList = atom({
  key: 'systemMenuList', 
  default: SystemMenuList, 
});
const menuList = atom({
  key: 'menuList', 
  default: MenuList, 
});

export default function Menus() {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const [menu, setMenu] = useRecoilState(menuList);
  console.log("Test: ",menu);

  return (
    <>
    <div className="flex flex-col p-6">
      <Breadcrumps link={pathname.replace(/^\/+/g, '')}/>
    <div className="p-4 md:p-6 lg:p-6">
    <MenuDropdown />
    </div>
     <div className="p-6 bg-gray-100 ">
      <ul className="nested-list list-none">
        <li className="text-lg font-semibold">Parent Item 1
          <ul className="list-none">
            <li>Child Item 1</li>
            <li>Child Item 2
              <ul className="list-none">
                <li>Grandchild Item 1</li>
                <li>Grandchild Item 2</li>
              </ul>
            </li>
            <li className="text-sm text-gray-500">Child Item 3</li>
          </ul>
        </li>
        <li className="text-lg font-semibold">Parent Item 2
          <ul className="list-none">
            <li>Child Item A</li>
            <li>Child Item B</li>
          </ul>
        </li>
        <li className="text-lg font-semibold">Parent Item 3
          <ul className="list-none">
            <li>Child Item X</li>
            <li>Child Item Y</li>
            <li>Child Item Z</li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
    </>
  );
}



function MenuDropdown() {
  const [systemMenu, setSystemMenu] = useRecoilState(systemMenuList);
  
  const handleAddMenu =() => {
    console.log("Test122",systemMenu);
  }
  return (
  <div class="w-full max-w-sm min-w-[200px]">
        <label class="block mb-1 text-sm text-slate-800">
          Menus
        </label>
      

      <div class="relative">
    <select
        class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
        {
           SystemMenuList && SystemMenuList.map((itm) => (
            <MenuListItem data={itm}/>
            ))
        }
        <option onClick={handleAddMenu} >
        <button type="button" class="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  data-ripple-light="true" data-dialog-target="dialog">Add System Menu</button>
        </option>
    </select>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
  </div>
        <div className="py-1" />

<div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true"
  class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
  <div data-dialog="dialog"
    class="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
    <div
      class="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
      Its a simple dialog.
    </div>
    <div
      class="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
      The key to more success is to have a lot of pillows. Put it this way, it took me
      twenty five years to get these plants, twenty five years of blood sweat and tears, and
      I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
      luv.
    </div>
    <div class="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
      <button data-ripple-dark="true" data-dialog-close="true"
        class="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Cancel
      </button>
      <button data-ripple-light="true" data-dialog-close="true"
        class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Confirm
      </button>
    </div>
  </div>
</div>  
</div>
  )
}

function MenuListItem({data}) {
  return (
      <option value={data.id}>
          <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">{data.name}</span>
      </option>
  )
}