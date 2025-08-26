import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCode, faClock } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';

const colorClasses = {
  indigo: {
    bgLight: 'bg-indigo-500/5',
    borderLight: 'border-indigo-500/20',
    borderHover: 'group-hover:border-indigo-500/40',
    iconBg: 'bg-indigo-900/60 group-hover:bg-indigo-800/70',
    text: 'text-indigo-300 group-hover:text-indigo-200',
    link: 'text-indigo-400 hover:text-indigo-300',
    icon: 'text-indigo-500',
  },
  red: {
    bgLight: 'bg-red-500/5',
    borderLight: 'border-red-500/20',
    borderHover: 'group-hover:border-red-500/40',
    iconBg: 'bg-red-900/60 group-hover:bg-red-800/70',
    text: 'text-red-300 group-hover:text-red-200',
    link: 'text-red-400 hover:text-red-300',
    icon: 'text-red-500',
  },
  cyan: {
    bgLight: 'bg-cyan-500/5',
    borderLight: 'border-cyan-500/20',
    borderHover: 'group-hover:border-cyan-500/40',
    iconBg: 'bg-cyan-900/60 group-hover:bg-cyan-800/70',
    text: 'text-cyan-300 group-hover:text-cyan-200',
    link: 'text-cyan-400 hover:text-cyan-300',
    icon: 'text-cyan-500',
  },
  purple: {
    bgLight: 'bg-purple-500/5',
    borderLight: 'border-purple-500/20',
    borderHover: 'group-hover:border-purple-500/40',
    iconBg: 'bg-purple-900/60 group-hover:bg-purple-800/70',
    text: 'text-purple-300 group-hover:text-purple-200',
    link: 'text-purple-400 hover:text-purple-300',
    icon: 'text-purple-500',
  },
  blue: {
    bgLight: 'bg-blue-500/5',
    borderLight: 'border-blue-500/20',
    borderHover: 'group-hover:border-blue-500/40',
    iconBg: 'bg-blue-900/60 group-hover:bg-blue-800/70',
    text: 'text-blue-300 group-hover:text-blue-200',
    link: 'text-blue-400 hover:text-blue-300',
    icon: 'text-blue-500',
  },
};

const icons = {
  faCoffee: faCoffee,
  faCode: faCode,
  faClock: faClock,
};

function Box({ title, desc, color = 'indigo', icon = 'faCoffee', link = null }) {
  const boxRef = useRef(null);
  const parentRef = useRef(null); // Store the original parent
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Set the original parent when the component mounts
  useEffect(() => {
    if (boxRef.current) {
      parentRef.current = boxRef.current.parentNode;
    }
  }, []);

  const handleMouseDown = (e) => {
    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setOffset({
      x: e.pageX - (rect.left + scrollLeft),
      y: e.pageY - (rect.top + scrollTop),
    });

    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const box = boxRef.current;
    if (!box) return;

    box.style.position = 'absolute';
    box.style.zIndex = 1000;
    box.style.left = `${e.pageX - offset.x}px`;
    box.style.top = `${e.pageY - offset.y}px`;

    document.body.appendChild(box);
  };

  const handleMouseUp = () => {
    setDragging(false);
    const box = boxRef.current;
    const originalParent = parentRef.current;
    var sect = document.getElementsByClassName('App')[0].querySelector('section');

    if (box && originalParent && box.parentNode !== originalParent) {
      sect.appendChild(box);
      console.log(sect, "appended");
    }
  };

  const menu = (e) => {
    var B = e.currentTarget
    if (document.getElementById("menued")){
      document.getElementById("menued").id = "";
    };
    e.currentTarget.id = "menued";
    document.addEventListener("click", () => B.id = "");
    window.addEventListener("blur", () => B.id = "");
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div
      ref={boxRef}
      className="relative group cursor-move"
      onContextMenu={menu}
      onMouseDown={handleMouseDown}
    >
      <div className={`absolute inset-0 ${colorClasses[color].bgLight} rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity`}></div>
      <div className={`border-2 bg-gradient-to-br from-gray-900 ${colorClasses[color].borderLight} rounded-lg p-6 relative z-10 h-full ${colorClasses[color].borderHover} transition-all duration-300`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded ${colorClasses[color].iconBg} flex items-center justify-center mr-3 transition-colors`}>
              <FontAwesomeIcon icon={icons[icon]} className={colorClasses[color].icon} />
            </div>
            <div className={`font-medium text-lg ${colorClasses[color].text} transition-colors`}>{title}</div>
          </div>
          <p className="text-start text-gray-400 mb-4">{desc}</p>
          {link ? (
            <a href={link} className={`mt-auto ${colorClasses[color].link} inline-flex items-center`}>
              Learn more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Box;