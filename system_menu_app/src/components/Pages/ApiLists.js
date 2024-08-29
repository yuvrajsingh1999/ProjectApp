
import Breadcrumps from "./Breadcrumps";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";



export default function ApiLists() {
  const location = useLocation();
  const {pathname} = location;
  return (
    <>
    <div className="flex flex-col p-6">
        <Breadcrumps link={pathname.replace(/^\/+/g, '')}/>
    <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
  <div class="rounded-lg bg-white p-8 text-center shadow-xl">
    <h1 class="mb-4 text-4xl font-bold">404</h1>
    <p class="text-gray-600">Oops! The page you are looking for could not be found.</p>
    <Link to="/menus" class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go back to Menus </Link>
  </div>
</div>
</div>
    </>
  );
}