import { Link, Route, Switch } from "wouter";
import Home from "./home";
import WebAnimations from "./web-animations";

export default function App() {
  return (
    <>
      <nav className='flex flex-col items-center justify-center h-[10svh] w-screen px-4'>
        <ul className='text-2xl flex flex-row gap-4 justify-start w-full'>
          <li className='mb-4'>
            <Link
              href='/'
              className='border-b-2 '>
              Home
            </Link>
          </li>
          <li className='mb-4'>
            <Link
              href='/web-animations'
              className='border-b-2'>
              Web Animations
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route
          path='/web-animations'
          component={WebAnimations}
        />
        <Route path='/:path*'>
          {() => <div className='text-center p-4'>404: No such page!</div>}
        </Route>
      </Switch>
    </>
  );
}
