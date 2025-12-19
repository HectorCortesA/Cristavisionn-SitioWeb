import React from "react";

interface MenuItem {
  id: string;
  label: string;
}

interface MenuHorizontalProps {
  sections: MenuItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const MenuHorizontal: React.FC<MenuHorizontalProps> = ({
  sections,
  activeSection,
  onSectionClick,
}) => {
  const handleClick = (sectionId: string) => {
    onSectionClick(sectionId);
  };

  return (
    <nav className="proyectos-menu-horizontal">
      <div className="menu-container">
        <ul className="menu-list-horizontal">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`menu-item-horizontal ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => handleClick(section.id)}
            >
              <span className="menu-label-horizontal">{section.label}</span>
              <span className="menu-indicator"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuHorizontal;
