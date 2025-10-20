// SideBarDashboard.jsx
import React, {useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {FaTimes, FaChevronDown, FaChevronRight, FaSun, FaMoon} from 'react-icons/fa';
import Logo from "./Logo";
import {Link} from 'react-router';

/* tiny cx helper */
function cx( ...args ) {
  return args.filter( Boolean ).join( ' ' );
}

export default function SidebarDashboard( {open, onClose, links = []} ) {
  const containerRef = useRef( null );

  useEffect( () => {
    function onKey( e ) {
      if ( e.key === 'Escape' ) onClose?.();
    }
    window.addEventListener( 'keydown', onKey );
    return () => window.removeEventListener( 'keydown', onKey );
  }, [ onClose ] );

  useEffect( () => {
    if ( !open ) return;
    const first = containerRef.current?.querySelector( 'a,button' );
    first?.focus();
  }, [ open ] );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{opacity: 0}}
            animate={{opacity: 0.35}}
            exit={{opacity: 0}}
            className="z-40 fixed inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden
          />

          <motion.aside
            key="sidebar"
            ref={containerRef}
            initial={{x: '-100%'}}
            animate={{x: 0}}
            exit={{x: '-100%'}}
            transition={{type: 'spring', stiffness: 300, damping: 28}}
            className={cx(
              'fixed left-0 bg-app top-0 bottom-0 z-50 w-65 max-w-full flex flex-col border-e shadow-lg',
              ' text-gray-800',
              'border-gray-400 dark:border-gray-800',
              ' dark:text-gray-100'
            )}
            aria-label="Sidebar"
          >
            <Header onClose={onClose} />

            <div className="flex-1 p-3 overflow-y-auto">
              <nav className="space-y-2">
                {links.map( item => {
                  if ( item.type === 'link' ) return <NavLink key={item.id} item={item} />;
                  if ( item.type === 'dropdown' ) return <Dropdown key={item.id} item={item} />;
                  if ( item.type === 'tree' ) return <Tree key={item.id} item={item} />;
                  return null;
                } )}
              </nav>
            </div>

            <div className="flex items-center gap-3 p-3 border-gray-400 dark:border-gray-800 border-t">
              <button
                onClick={() => alert( 'Logged out' )}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded text-white"
              >
                Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* Header with logo, close button and optional theme toggle */
function Header( {onClose} ) {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-3 border-gray-400 dark:border-gray-800 border-b">
      <div className="flex items-center gap-3">
        <Logo />
      </div>

      <button
        className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <FaTimes className="w-5 h-5" />
      </button>
    </div>
  );
}

/* NavLink */
function NavLink( {item} ) {
  const base = 'flex items-center gap-3 px-3 py-2 rounded';
  const state = item.active ? 'bg-gray-100 dark:bg-slate-800 font-medium' : 'hover:bg-gray-100 dark:hover:bg-slate-800';
  return (
    <Link to={item.href || '#'} className={cx( base, state )}>
      <span>{item.title}</span>
    </Link>
  );
}

/* Dropdown (single-level) */
function Dropdown( {item} ) {
  const [ open, setOpen ] = React.useState( false );
  return (
    <div>
      <button
        onClick={() => setOpen( v => !v )}
        className="flex justify-between items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-2 rounded focus:outline-none w-full"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span>{item.title}</span>
        </div>

        <motion.span animate={{rotate: open ? 180 : 0}} transition={{type: 'spring', stiffness: 400, damping: 30}}>
          <FaChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.18}}
            className="pl-10"
          >
            <div className="flex flex-col">
              {item.children?.map( child => (
                <a key={child.id} href={child.href || '#'} className="hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-2 rounded">
                  {child.title}
                </a>
              ) )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Tree (recursive) */
function Tree( {item} ) {
  return <div className="space-y-1"><TreeNode node={item} depth={0} /></div>;
}

function TreeNode( {node, depth = 0} ) {
  const [ open, setOpen ] = React.useState( Boolean( node.defaultOpen ) );
  const hasChildren = Array.isArray( node.children ) && node.children.length > 0;
  return (
    <div>
      <div className="flex justify-between items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800 px-2 py-2 rounded" style={{paddingLeft: 12 + depth * 12}}>
        <div className="flex items-center gap-3">
          {hasChildren ? (
            <button onClick={() => setOpen( v => !v )} className="hover:bg-gray-100 dark:hover:bg-slate-800 p-1 rounded focus:outline-none" aria-label={open ? 'Collapse' : 'Expand'}>
              {open ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
            </button>
          ) : <div className="w-4" />}


          <a href={node.href || '#'} className="text-gray-800 dark:text-gray-100 hover:underline">
            {node.title}
          </a>
        </div>

        {node.count != null && (
          <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400 text-xs">
            {node.count}
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}} transition={{duration: 0.18}}>
            <div>{node.children.map( child => <TreeNode key={child.id} node={child} depth={depth + 1} /> )}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}