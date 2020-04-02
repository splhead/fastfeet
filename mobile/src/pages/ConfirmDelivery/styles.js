import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';
import colors from '~/util/colors';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: -80px;
  padding: 0 20px;
`;

export const CameraWrapper = styled.View`
  flex: 1;
  border-radius: 4px;
  background: #f5f5f5;
  overflow: hidden;
`;

export const Camera = styled(RNCamera).attrs({
  type: 'back',
  captureAudio: false,
  type: RNCamera.Constants.Type.back,
  androidCameraPermissionOptions: {
    title: 'Permissão para usar a câmera',
    message:
      'Precisamos de permissão para usar sua câmera para colher a assinatura do destinatário.',
    buttonPositive: 'OK',
    buttonNegative: 'Cancelar',
  },
})`
  flex: 1;
`;

export const PictureButton = styled(TouchableOpacity)`
  background: rgba(000, 000, 000, 0.5);
  position: absolute;
  padding: 20px;
  border-radius: 100px;
  bottom: 5px;
  align-self: center;
`;

export const SendButton = styled(Button)`
  height: 45px;
  background: ${colors.primary};
`;
