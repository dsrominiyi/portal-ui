import React, {
  FunctionComponent,
  ReactNode,
  useState,
  useRef,
  useEffect,
  MouseEvent
} from 'react';
import classnames from 'classnames/bind';
import Link from '../../Link';
import NavLink from '../NavLink';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export interface SubItem {
  label: string;
  href?: string;
  onClick?(event: MouseEvent): void;
}

export interface Props {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  isMiniLink?: boolean;
  subItems: SubItem[];
}

export const ExpandableNavLink: FunctionComponent<Props> = ({
  label,
  icon,
  isActive,
  isMiniLink,
  subItems
}: Props) => {
  const [isExpanded, toggleExpand] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dropdownDiv = dropdownRef.current as HTMLInputElement;
    if (!isMiniLink) {
      dropdownDiv.style.height = isExpanded ? `${dropdownDiv.scrollHeight}px` : '0';
    } else {
      dropdownDiv.style.height = 'auto';
    }
  }, [isExpanded, isMiniLink]);

  useEffect(() => {
    if (isExpanded) {
      toggleExpand(!isExpanded);
    }
  }, [isMiniLink]);

  const displayLinks = subItems.map((subItem, index) => {
    return (
      <Link
        key={index}
        label={subItem.label}
        href={subItem.href}
        onClick={subItem.href ? undefined : subItem.onClick}
        classNames={[styles.link]}
      />
    );
  });

  return (
    <div className={styles.expandableNavLink}>
      <div
        className={cx({ clickableLink: true, mini: isMiniLink })}
        onClick={() => toggleExpand(!isExpanded)}
      >
        <NavLink label={label} icon={icon} isActive={isActive} isMiniLink={isMiniLink} />
        {!isMiniLink && (
          <i
            className={cx({ chevron: true, 'fas fa-chevron-right': true, expanded: isExpanded })}
          />
        )}
      </div>
      <div
        ref={dropdownRef}
        className={cx({
          dropDown: true,
          mini: isMiniLink,
          expanded: !isMiniLink && isExpanded,
          hidden: isMiniLink && !isExpanded
        })}
      >
        {displayLinks}
      </div>
    </div>
  );
};

ExpandableNavLink.displayName = 'ExpandableNavLink';
export default ExpandableNavLink;
