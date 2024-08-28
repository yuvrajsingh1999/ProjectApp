
import {ChevronDownArrow} from "../../assets/IconSvgs";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';



export default function Menus() {
  return (
    <>
    <div className="flex flex-col p-6">
    <div className="">
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
  return (
    <Menu as="div" className="w-full crelative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownArrow aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute z-10  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="/M"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Duplicate
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Archive
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Move
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Share
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Add to favorites
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}