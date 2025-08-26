import "./menu.css";
import React from "react";

class ContextMenu {
  constructor({ target = null, menuItems = [] }) {
    this.target = target;
    this.menuItems = menuItems;
    this.targetNode = this.getTargetNode();
    this.menuItemsNode = this.getMenuItemsNode();
    this.isOpened = false;
  }

  getTargetNode() {
    if (this.target) {
      const nodes = document.querySelectorAll(this.target);
      if (nodes && nodes.length !== 0) {
        return nodes;
      } else {
        console.error(`getTargetNode :: "${this.target}" target not found`);
        return [];
      }
    }
    return [document]; // Default to entire document if no target specified
  }

  getMenuItemsNode() {
    const nodes = [];

    if (!this.menuItems) {
      console.error("getMenuItemsNode :: Please enter menu items");
      return [];
    }

    this.menuItems.forEach((data, index) => {
      const item = this.createItemMarkup(data);
      item.firstChild.setAttribute(
        "style",
        `animation-delay: ${index * 0.08}s`
      );
      nodes.push(item);
    });

    return nodes;
  }

  createItemMarkup(data) {
    const button = document.createElement("BUTTON");
    const item = document.createElement("LI");

    button.innerHTML = data.content;
    button.classList.add("contextMenu-button");
    item.classList.add("contextMenu-item");

    if (data.divider) item.setAttribute("data-divider", data.divider);
    item.appendChild(button);

    if (data.events && data.events.length !== 0) {
      Object.entries(data.events).forEach((event) => {
        const [key, value] = event;
        button.addEventListener(key, value);
      });
    }

    return item;
  }

  renderMenu() {
    const menuContainer = document.createElement("UL");
    menuContainer.classList.add("contextMenu");
    this.menuItemsNode.forEach((item) => menuContainer.appendChild(item));
    return menuContainer;
  }

  closeMenu(menu) {
    if (this.isOpened) {
      this.isOpened = false;
      menu.remove();
    }
  }

  init() {
    const contextMenu = this.renderMenu();
    document.addEventListener("click", () => this.closeMenu(contextMenu));
    window.addEventListener("blur", () => this.closeMenu(contextMenu));

    this.targetNode.forEach((target) => {
      target.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.isOpened = true;

        const { clientX, clientY } = e;
        document.body.appendChild(contextMenu);

        const positionY =
          clientY + contextMenu.scrollHeight >= window.innerHeight
            ? window.innerHeight - contextMenu.scrollHeight - 20
            : clientY;
        const positionX =
          clientX + contextMenu.scrollWidth >= window.innerWidth
            ? window.innerWidth - contextMenu.scrollWidth - 20
            : clientX;

        contextMenu.setAttribute(
          "style",
          `--width: ${contextMenu.scrollWidth}px;
           --height: ${contextMenu.scrollHeight}px;
           --top: ${positionY}px;
           --left: ${positionX}px;`
        );
      });
    });
  }
}

const copyIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

const cutIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`;

const pasteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;

const downloadIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

const deleteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

var El = null;
let deletedBox = null; // Store deleted box
let deletedMsg = null; // Store message element

const menuItems = [
  {
    content: `${copyIcon}Copy`,
    events: {
      click: (e) => {
        console.log(e, "Copy clicked");
        El = document.getElementById('menued');
      }
    }
  },
  { content: `${pasteIcon}Paste`,
    events: {
      click: (e) => {
        console.log(e, "Paste clicked");
        let copy = El.cloneNode(true);
        // const copy = React.cloneElement(El);
        console.log(copy, "copied");
        document.getElementsByClassName('App')[0].querySelector("section").appendChild(copy);
      }
    } },
  { content: `${cutIcon}Cut` },
  { content: `${downloadIcon}Download` },
  {
    content: `${deleteIcon}Delete`,
    events: {
      click: (e) => {
        console.log(e, "deleted");
        const box = document.getElementById('menued');
        if (box) {
          deletedBox = box.cloneNode(true); // Save a copy
          box.remove();

          // Show message
          deletedMsg = document.createElement('div');
          deletedMsg.textContent = 'deleted';
          deletedMsg.style.position = 'fixed';
          deletedMsg.style.top = '20px';
          deletedMsg.style.right = '20px';
          deletedMsg.style.background = '#222';
          deletedMsg.style.color = '#fff';
          deletedMsg.style.padding = '8px 16px';
          deletedMsg.style.borderRadius = '6px';
          deletedMsg.style.zIndex = 9999;
          document.body.appendChild(deletedMsg);

          // Listen for next click to restore
          const restoreBox = () => {
            if (deletedBox) {
              const sect = document.getElementsByClassName('App')[0].querySelector("section");
              sect.appendChild(deletedBox);
              deletedBox = null;
            }
            if (deletedMsg) {
              deletedMsg.remove();
              deletedMsg = null;
            }
            document.removeEventListener('click', restoreBox);
          };
          setTimeout(() => {
            document.addEventListener('click', restoreBox);
          }, 0);
        }
      }
    },
    divider: "top"
  }
];

const contextMenu = new ContextMenu({
  menuItems
});

contextMenu.init();