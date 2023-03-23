import { CSSProperties, FC, ReactNode } from 'react';
import { ToolTip, ToolTipProps } from '../tooltip';
import classnames from 'classnames';
import './index.css';
import { themeVal } from '@onlineclass/ui-kit/tailwindcss';
const colors = themeVal('colors');
const borderRadius = themeVal('borderRadius');
const borderColor = themeVal('borderColor');
const defaultLargePopoverOverlayInnerStyle: CSSProperties = {
  width: 222,
  padding: 0,
  background: `${colors?.['block-2']}`,
  border: `1px solid ${borderColor?.[1]}`,
  borderRadius: `${borderRadius?.[12]}`,
  overflow: 'hidden',
};
const defaultSmallPopoverOverlayInnerStyle: CSSProperties = {
  width: 171,
  padding: 0,
  background: `${colors?.['block-2']}`,
  border: `1px solid ${borderColor?.[1]}`,
  borderRadius: `${borderRadius?.[8]}`,
  overflow: 'hidden',
};
interface PopoverProps extends ToolTipProps {
  /**
   * 气泡操作面板的尺寸，可选值为 large | small
   */
  /** @en
   * The size of popover dialog, can be set to large | small.
   */
  size?: 'large' | 'small';
}
export const Popover: FC<PopoverProps> = (props) => {
  const {
    children,
    overlayClassName,
    showArrow,
    overlayInnerStyle,
    size = 'large',
    ...otherProps
  } = props;
  return (
    <ToolTip
      {...otherProps}
      overlayClassName={classnames('fcr-popover', overlayClassName)}
      showArrow={showArrow || false}
      overlayInnerStyle={{
        ...(size === 'large'
          ? defaultLargePopoverOverlayInnerStyle
          : defaultSmallPopoverOverlayInnerStyle),
        ...overlayInnerStyle,
      }}>
      {children}
    </ToolTip>
  );
};
interface DoubleDeckPopoverProps extends ToolTipProps {
  /**
   * popover上部分的内容
   */
  /** @en
   * The content of deck on top of the popover dialog.
   */
  topDeckContent?: ReactNode;
  /**
   * popover下部分的内容
   */
  /** @en
   * The content of deck on bottom of the popover dialog.
   */
  bottomDeckContent?: ReactNode;
}
export const DoubleDeckPopover: FC<DoubleDeckPopoverProps> = (props) => {
  const { children, bottomDeckContent, topDeckContent, ...otherProps } = props;
  return (
    <Popover
      {...otherProps}
      size="large"
      content={
        <div className="fcr-double-deck-popover-overlay">
          <div className="fcr-double-deck-popover-top">{topDeckContent}</div>
          {bottomDeckContent}
        </div>
      }>
      {children}
    </Popover>
  );
};
