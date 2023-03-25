import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 7.75C37.5563 7.75 41.25 11.4437 41.25 16V26.76C41.25 30.486 38.5293 33.5766 34.9661 34.1534C34.0191 37.6655 30.8114 40.25 27 40.25H16C11.4437 40.25 7.75 36.5563 7.75 32V21C7.75 16.7275 10.9977 13.2136 15.1591 12.7923C16.1733 9.85767 18.9605 7.75 22.24 7.75H33ZM17.9147 12.75H27C31.5564 12.75 35.25 16.4437 35.25 21V31.5238C37.2781 30.8901 38.75 28.9969 38.75 26.76V16C38.75 12.8244 36.1756 10.25 33 10.25H22.24C20.3909 10.25 18.7768 11.2557 17.9147 12.75ZM10.25 21C10.25 17.8244 12.8244 15.25 16 15.25H27C30.1756 15.25 32.75 17.8244 32.75 21V32C32.75 35.1756 30.1756 37.75 27 37.75H16C12.8244 37.75 10.25 35.1756 10.25 32V21Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
