import React, { ReactNode, forwardRef, ForwardRefRenderFunction, RefObject } from 'react';

interface TabContentProps {
  id: string;
  active: boolean;
  children?: ReactNode;
}

const TabContent: ForwardRefRenderFunction<HTMLDivElement, TabContentProps> = ({ id, active, children }, ref) => {
  return (
    <div id={id} className={`tabcontent ${active ? 'active' : ''}`} ref={ref}>
      {children}
    </div>
  );
};

export default forwardRef(TabContent);
