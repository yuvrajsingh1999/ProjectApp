import React, { useRef, useEffect } from 'react';
import Breadcrumps from "./Breadcrumps";
import { useLocation } from 'react-router-dom';
import {SystemMenuList, MenuList} from "../../assets/DemoData";
import {
  atom,
  useRecoilState,
   selector,
   useRecoilValue,
} from 'recoil';
import {API_GET_SYSTEM_URL} from "../../Env";
import { useQuery } from '@tanstack/react-query';

const systemMenuList = atom({
  key: 'systemMenuList', 
  default: SystemMenuList, 
});
const mainMenuId = atom({
  key: 'mainMenuId', 
  default: null, 
});
const menuList = atom({
  key: 'menuList', 
  default: MenuList, 
});
const uniClickDep = atom({
  key: 'uniClickDep', 
  default: { nodeName: null, parentName: null, depth: null, nodeId: null }, 
});
const editOpen = atom({
  key: 'editOpen', 
  default: false, 
});
const addOpen = atom({
  key: 'addOpen', 
  default: false, 
});
const nodeIdBtn = atom({
  key: 'nodeIdBtn', 
  default: null, 
});
const filteredMenuList = selector({
  key: 'filteredMenuList',
  get: ({ get }) => {
    const mainMenu = get(mainMenuId);
    const menuListValue = get(menuList);
    console.log(menuListValue);
    // Filter menuList based on the mainMenuId
    return menuListValue.filter(item => item.mainMenuId === parseInt(mainMenu));
  },
});



export default function Menus() {
  const detailsRefs = useRef([]);
  const location = useLocation();
  const {pathname} = location;
  //eslint-disable-next-line
  const [menu, setMenu] = useRecoilState(menuList);
  const [clickedNodeDepth, setClickedNodeDepth] = useRecoilState(uniClickDep);
  const [editOpenTab, setEditOpenTab] = useRecoilState(editOpen);
  const [addOpenTab, setAddOpenTab] = useRecoilState(addOpen);
  const [mainMenu, setMainMenu] = useRecoilState(mainMenuId);
  const menuItems = useRecoilValue(filteredMenuList);
  var nestedTree = transformToTree(menuItems);
  useEffect(() => {
    //eslint-disable-next-line
    nestedTree = transformToTree(menuItems);  
  }, [menu]);

  useEffect(() => {   
    //eslint-disable-next-line 
    nestedTree = transformToTree(menuItems);
  }, [mainMenu]);


  const handleExpandAll = () => {
     detailsRefs.current.forEach(details => {
      if (details) details.open = true;
    });

    setEditOpenTab(false);
    setAddOpenTab(false);
  }

  const handleCollapseAll = () => {
     detailsRefs.current.forEach(details => {
      if (details) details.open = false;
    });

    setEditOpenTab(false);
    setAddOpenTab(false);
  }
   
  const handleNodeClick = (node, depth) => {
    const nodeName = node.name;
    const nodeId = node.id;
    const parentName = findParentNodeName(node.id, nestedTree);
    setClickedNodeDepth({nodeName, parentName, depth, nodeId});
  };
  const findParentNodeName = (id, nodes) => {
     let parentName = null;
  const traverse = (nodes) => {
    for (const node of nodes) {
      if (node.children) {
        for (const child of node.children) {
          if (child.id === id) {
            parentName = node.name;
            return; // Exit the traversal when parent is found
          }
          traverse(node.children); // Recursively search in the children
        }
      }
    }
  };

  traverse(nodes);
  return parentName;
  };

  const handleSubmitEdit =() => {
    var newname = document.getElementById('name').value;
    if(editOpenTab){
    setMenu(prevNodes => 
            prevNodes.map(node =>
                node.id === clickedNodeDepth.nodeId ? { ...node, name: newname } : node
            )
        );
    }
    if(addOpenTab){
      setMenu((prevMenuList) => [
      ...prevMenuList,
      { id: prevMenuList.length + 1 , name: newname, parentId: clickedNodeDepth.nodeId , mainMenuId: parseInt(mainMenu) }
    ]);
    }
    setEditOpenTab(false);
    setAddOpenTab(false);
  }
  return (
    <>
    <div className="flex flex-col p-6 w-2/5 smallScreenMenu">
      <Breadcrumps link={pathname.replace(/^\/+/g, '')}/>
    <div className="p-4 md:p-6 lg:p-6">
    <MenuDropdown setMainMenu={setMainMenu} />
    </div>
    <div>
    <button onClick={handleExpandAll} type="button" class="w-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    Expand All</button>
    <button onClick={handleCollapseAll} type="button" class="w-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
    Collapse All</button>
    </div>
     <div className="p-6 bg-gray-100 ">
     {
      mainMenu && nestedTree ? 
      <RenderTree nodes={nestedTree} setAddOpenTab={setAddOpenTab} setEditOpenTab={setEditOpenTab} toggleOpen={el => detailsRefs.current.push(el)} onNodeClick={handleNodeClick} />
      :
      <span>No Data</span>
      }
     
    </div>
    </div>
    {clickedNodeDepth !== null && (editOpenTab || addOpenTab) && (
        <div className="p-6 w-2/5 smallScreenMenu">
        {addOpenTab && 
        <span className="text-lg">Add New menu</span>
        }
        {editOpenTab && 
        <span className="text-lg">Edit menu</span>
        }
        
          <form class="max-w-sm mx-auto w-full">
  {editOpenTab && <>
  <div class="mb-5">
    <label for="menuId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Menu ID</label>
    <input type="text" readonly value={clickedNodeDepth.nodeId} id="menuId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="mb-5">
    <label for="depth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Depth</label>
    <input type="text" readonly value={clickedNodeDepth.depth} id="depth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <div class="mb-5">
    <label for="parent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent Data</label>
    <input type="text" readonly value={clickedNodeDepth.parentName} id="parent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  </>}
  
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" defaultValue={clickedNodeDepth.nodeName} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button type="button" onClick={handleSubmitEdit} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
</form>
        </div>
      )}
    </>
  );
}

function RenderTree({nodes, depth = 0, onNodeClick, toggleOpen, setEditOpenTab, setAddOpenTab})  {

  const [selectedNodeBtn, setSelectedNodeBtn] = useRecoilState(nodeIdBtn);
  const handleClick = (nData) => {
    onNodeClick(nData,depth);
    setEditOpenTab(false);
    setSelectedNodeBtn(nData.id);
  };
  const handleAddNew = (nData) => {
    onNodeClick(nData,depth);
    setSelectedNodeBtn(nData.id);
    setAddOpenTab(true);
  }
  return (
      <ul class="tree">
      {nodes.map(node => (

        <li key={node.id}>
          <details ref={toggleOpen} >
            <summary  onDoubleClick={() => setEditOpenTab(true)} onClick={(e) => handleClick(node)} className={node.children && node.children.length === 0 ? "noChild" : ""} >{node.name} 
            <button id={node.id} type="button"  onClick={() => handleAddNew(node)} style={{verticalAlign: 'bottom',  display: selectedNodeBtn === node.id ? 'initial' : 'none'}} class=" text-xs text-white AddChildBtn bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full mx-2.5 p-0.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
</summary>
            
          {node.children && node.children.length > 0 && <RenderTree nodes={node.children} toggleOpen={toggleOpen} depth={depth + 1}
                onNodeClick={onNodeClick} setEditOpenTab={setEditOpenTab} setAddOpenTab={setAddOpenTab}/>}
          </details>
        </li>
      ))}
      </ul>
);
}



function MenuDropdown({setMainMenu}) {
  //eslint-disable-next-line
  const [systemMenu, setSystemMenu] = useRecoilState(systemMenuList);

  const useFetchSystemMenuList = () => {

  return useQuery({
    queryKey: ['systemMenuList'],
    queryFn: async () => {
      const response = await fetch(`${API_GET_SYSTEM_URL}`); // Update with your API endpoint
      if (!response.ok) {
        return null;
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSystemMenu(data); // Update Recoil state with the fetched data
    },
  });
};
  
  useFetchSystemMenuList();

  const handleAddMenu =(event) => {
    setMainMenu(event.target.value);
  }
  return (
  <div class="w-full max-w-sm min-w-[200px]">
        <label class="block mb-1 text-sm text-slate-800">
          Menus
        </label>
      

      <div class="relative">
    <select  onChange={handleAddMenu}
        class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
        <option value="">Select Below Option</option>
        {
           SystemMenuList && SystemMenuList.map((itm) => (
            <MenuListItem data={itm}/>
            ))
        }
        
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

const transformToTree = (menuList) => {
  const map = new Map();
  const tree = [];

  // Step 1: Initialize all nodes in the map with empty children array
  menuList.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });
  // Step 2: Build the tree by linking children to their parent nodes
  menuList.forEach(item => {
    const node = map.get(item.id);
    if (item.parentId === null) {
      // Top-level item
      tree.push(node);
    } else {
      // Non-top-level item
      const parentNode = map.get(item.parentId);

    if (parentNode) {
        parentNode.children.push(node);
      }
    }

  });
  return tree;
};