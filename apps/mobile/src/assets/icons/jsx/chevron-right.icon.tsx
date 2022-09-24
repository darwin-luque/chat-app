import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ChevronRightIcon = (props: SvgProps) => (
  <Svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 5 7 7-7 7"
    />
  </Svg>
);

export default ChevronRightIcon;
