import { Popover } from '@onlineclass/components/popover';
import { Radio } from '@onlineclass/components/radio';
import { SvgIconEnum, SvgImg } from '@onlineclass/components/svg-img';
import { ToolTip } from '@onlineclass/components/tooltip';
import { FC, useState } from 'react';
import { ActionBarItemWrapper } from '..';
import { observer } from 'mobx-react';
import './index.css';
import { useStore } from '@onlineclass/utils/hooks/use-store';

export const MicrophoenDevice: FC = observer(() => {
  const { tootipVisible, handlePopoverVisibleChanged, handleTooltipVisibleChanged } =
    useDeviceTooltipVisible();
  const {
    deviceSettingUIStore: { isAudioRecordingDeviceEnabled, toggleAudioRecordingDevice },
  } = useStore();

  const icon = isAudioRecordingDeviceEnabled ? SvgIconEnum.FCR_MUTE : SvgIconEnum.FCR_NOMUTE;
  const text = isAudioRecordingDeviceEnabled ? 'Microphoen' : 'unmute';
  return (
    <ToolTip
      visible={tootipVisible}
      onVisibleChange={handleTooltipVisibleChanged}
      content={'Microphoen'}>
      <ActionBarItemWrapper>
        <div className="fcr-action-bar-device" onClick={toggleAudioRecordingDevice}>
          <div className="fcr-action-bar-device-inner">
            <SvgImg type={icon} size={36}></SvgImg>
            <div className="fcr-action-bar-device-text">{text}</div>
          </div>
          <Popover
            onVisibleChange={handlePopoverVisibleChanged}
            trigger="click"
            content={<AudioDeviceListPopoverContent></AudioDeviceListPopoverContent>}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="fcr-action-bar-device-extra">
              <SvgImg type={SvgIconEnum.FCR_DROPUP4}></SvgImg>
            </div>
          </Popover>
        </div>
      </ActionBarItemWrapper>
    </ToolTip>
  );
});
export const CameraDevice: FC = observer(() => {
  const { tootipVisible, handlePopoverVisibleChanged, handleTooltipVisibleChanged } =
    useDeviceTooltipVisible();
  const {
    deviceSettingUIStore: { isCameraDeviceEnabled, toggleCameraDevice },
  } = useStore();

  const icon = isCameraDeviceEnabled ? SvgIconEnum.FCR_CAMERA : SvgIconEnum.FCR_CAMERAOFF;
  const text = isCameraDeviceEnabled ? 'Camera' : 'unmute';
  return (
    <ToolTip
      onVisibleChange={handleTooltipVisibleChanged}
      visible={tootipVisible}
      content={'CameraDev'}>
      <ActionBarItemWrapper>
        <div className="fcr-action-bar-device" onClick={toggleCameraDevice}>
          <div className="fcr-action-bar-device-inner">
            <SvgImg type={icon} size={36}></SvgImg>
            <div className="fcr-action-bar-device-text">{text}</div>
          </div>
          <Popover
            onVisibleChange={handlePopoverVisibleChanged}
            content={<VideoDeviceListPopoverContent></VideoDeviceListPopoverContent>}
            trigger="click">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="fcr-action-bar-device-extra">
              <SvgImg type={SvgIconEnum.FCR_DROPUP4}></SvgImg>
            </div>
          </Popover>
        </div>
      </ActionBarItemWrapper>
    </ToolTip>
  );
});
const useDeviceTooltipVisible = () => {
  const {
    layoutUIStore: { setHasPopoverShowed },
  } = useStore();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [tootipVisible, setTootipVisible] = useState(false);
  const handleTooltipVisibleChanged = (visible: boolean) => {
    if (popoverOpened) {
      setTootipVisible(false);
    } else {
      setTootipVisible(visible);
    }
  };
  const handlePopoverVisibleChanged = (visible: boolean) => {
    setHasPopoverShowed(visible);
    setPopoverOpened(visible);
    visible && setTootipVisible(false);
  };
  return {
    tootipVisible,
    handleTooltipVisibleChanged,
    handlePopoverVisibleChanged,
  };
};
const VideoDeviceListPopoverContent = observer(() => {
  const {
    deviceSettingUIStore: { cameraDevicesList, cameraDeviceId, setCameraDevice },
  } = useStore();
  return (
    <div
      className="fcr-device-popover-content"
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <div className="fcr-device-popover-content-device-list">
        <div className="fcr-device-popover-content-device">
          <div className="fcr-device-popover-content-device-label">Local Camera</div>

          <div className="fcr-device-popover-content-device-options">
            {cameraDevicesList.map((device) => {
              return (
                <div key={device.value} onClick={() => setCameraDevice(device.value)}>
                  <Radio
                    name="video"
                    checked={cameraDeviceId === device.value}
                    label={device.text}></Radio>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fcr-device-popover-content-more">
        <SvgImg type={SvgIconEnum.FCR_SETTING} size={32}></SvgImg>
        <span>More Setting</span>
      </div>
    </div>
  );
});
const AudioDeviceListPopoverContent = observer(() => {
  const {
    deviceSettingUIStore: {
      recordingDevicesList,
      audioRecordingDeviceId,
      setAudioRecordingDevice,
      playbackDevicesList,
      audioPlaybackDeviceId,
      setAudioPlaybackDevice,
    },
  } = useStore();
  return (
    <div
      className="fcr-device-popover-content"
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <div className="fcr-device-popover-content-device-list">
        <div className="fcr-device-popover-content-device">
          <div className="fcr-device-popover-content-device-label">Select Microphone</div>

          <div className="fcr-device-popover-content-device-options">
            {recordingDevicesList.map((device) => {
              return (
                <div onClick={() => setAudioRecordingDevice(device.value)} key={device.value}>
                  <Radio
                    name="mic"
                    checked={audioRecordingDeviceId === device.value}
                    label={device.text}></Radio>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fcr-device-popover-content-device">
          <div className="fcr-device-popover-content-device-label">Speakers</div>

          <div className="fcr-device-popover-content-device-options">
            {playbackDevicesList.map((device) => {
              return (
                <div onClick={() => setAudioPlaybackDevice(device.value)} key={device.value}>
                  <Radio
                    name="speaker"
                    checked={audioPlaybackDeviceId === device.value}
                    label={device.text}></Radio>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fcr-device-popover-content-more">
        <SvgImg type={SvgIconEnum.FCR_SETTING} size={32}></SvgImg>
        <span>More Setting</span>
      </div>
    </div>
  );
});
