import React from 'react';
import { useEnv } from '@/context/EnvContext';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { useReaderStore } from '@/store/readerStore';
import { useSettingsStore } from '@/store/settingsStore';
import { FooterBarChildProps } from './types';
import { NavigationPanel } from './NavigationPanel';
import { FontLayoutPanel } from './FontLayoutPanel';
import { ColorPanel } from './ColorPanel';
import { NavigationBar } from './NavigationBar';

const MobileFooterBar: React.FC<FooterBarChildProps> = ({
  bookKey,
  gridInsets,
  actionTab,
  progressValid,
  progressFraction,
  navigationHandlers,
  onSetActionTab,
}) => {
  const { appService } = useEnv();
  const { settings } = useSettingsStore();
  const { hoveredBookKey } = useReaderStore();
  const isMobile = window.innerWidth < 640 || window.innerHeight < 640;
  const sliderHeight = useResponsiveSize(28);
  const marginIconSize = useResponsiveSize(20);
  const isNavigationBarEnabledInReader =
    settings.navigationBarVisibility === 'always' ||
    (settings.navigationBarVisibility === 'outside-reader' && hoveredBookKey === bookKey);
  const androidBottomInsetScale =
    appService?.isAndroidApp && isNavigationBarEnabledInReader ? 1 : 0.33;
  const safeBottomInset = isMobile
    ? gridInsets.bottom * androidBottomInsetScale
    : 0;
  const bottomOffset = `${safeBottomInset + 64}px`;
  const navPadding = `${safeBottomInset + 16}px`;

  return (
    <>
      <ColorPanel actionTab={actionTab} bottomOffset={bottomOffset} />
      <NavigationPanel
        bookKey={bookKey}
        actionTab={actionTab}
        progressFraction={progressFraction}
        progressValid={progressValid}
        navigationHandlers={navigationHandlers}
        bottomOffset={bottomOffset}
        sliderHeight={sliderHeight}
      />
      <FontLayoutPanel
        bookKey={bookKey}
        actionTab={actionTab}
        bottomOffset={bottomOffset}
        marginIconSize={marginIconSize}
      />
      <NavigationBar
        bookKey={bookKey}
        actionTab={actionTab}
        navPadding={navPadding}
        onSetActionTab={onSetActionTab!}
      />
    </>
  );
};

export default MobileFooterBar;
