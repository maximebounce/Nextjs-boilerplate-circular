import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScrollPosition } from '@/hooks';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };
const navigation = [
  { name: 'Me connecter', href: '/auth', current: true },
  { name: 'Nous contacter', href: '/contact', current: true },
];
// const userNavigation = [
//   { name: 'Dashboard', href: '#' },
//   { name: 'Profile', href: '#' },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const router = useRouter();
  const scrollPosition = useScrollPosition();

  const redirect = (path: string) => {
    router.push(path);
  };

  let image: any;
  if (scrollPosition > 0) {
    image = (
      <img
        className="h-6 pl-2"
        src="/assets/images/bounce_logo_white.png"
        alt="Bounce Sports logo"
      />
    );
  } else {
    image = (
      <img
        className="h-10"
        src="/assets/images/bounce-logo.png"
        alt="Bounce Sports logo"
      />
    );
  }

  let buttons: any;
  if (scrollPosition > 0) {
    buttons = (
      <div>
        <button
          onClick={() => redirect('/contact')}
          className="mr-2 rounded-3xl border-2 border-bounce-200 bg-bounce-100 px-5 py-2.5 font-medium text-bounce-200 hover:border-2 hover:border-bounce-100 hover:bg-bounce-200 hover:text-bounce-100"
        >
          Nous contacter
          {/* S&apos;inscrire */}
        </button>
        <button
          onClick={() => redirect('/auth')}
          className="ml-2 rounded-3xl border-2 bg-bounce-200 px-5 py-2.5 font-medium text-bounce-100 hover:bg-bounce-100 hover:text-bounce-200"
        >
          Me connecter
        </button>
      </div>
    );
  } else {
    buttons = (
      <div>
        <button
          onClick={() => redirect('/contact')}
          className="mr-2 rounded-3xl border-2 border-bounce-200 bg-bounce-100 px-5 py-2.5 font-medium text-bounce-200 hover:border-2  hover:bg-bounce-200 hover:text-bounce-100"
        >
          Nous contacter
          {/* S&apos;inscrire */}
        </button>
        <button
          onClick={() => redirect('/auth')}
          className="ml-2 rounded-3xl border-2 bg-bounce-200 px-5 py-2.5 font-medium text-bounce-100 hover:border-bounce-200 hover:bg-bounce-100 hover:text-bounce-200"
        >
          Me connecter
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className={classNames(
          scrollPosition > 0 ? 'bg-bounce-200' : 'bg-bounce-100',
          'sticky top-0 z-20'
        )}
      >
        <Disclosure as="nav" className=" ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
                <div className="flex h-24 items-center justify-between">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <Link href="/">{image}</Link>
                    </div>
                    {/* <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div> */}
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        {/* <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                              <span className="text-lg font-medium leading-none text-white">
                                TW
                              </span>
                            </span>
                          </Menu.Button> */}
                        {buttons}
                        {/* <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition> */}
                      </Menu>
                    </div>
                  </div>
                  <div className="m-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-bounce-200 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className=" space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {/* {buttons} */}
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {/* <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                        <span className="text-sm font-medium leading-none text-white">
                          TW
                        </span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
