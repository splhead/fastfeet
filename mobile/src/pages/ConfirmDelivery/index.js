import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, ToastAndroid } from 'react-native';
import api from '~/services/api';

import {
  Container,
  Content,
  CameraWrapper,
  Camera,
  PictureButton,
  SendButton,
} from './styles';
import Background from '~/components/Background';

export default function ConfirmDelivery() {
  const userId = useSelector((state) => state.auth.id);
  const [uri, setUri] = useState('');
  const cameraRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { deliveryId } = route.params;

  async function handleTakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: false, width: 800 };
      const data = await cameraRef.current.takePictureAsync(options);
      setUri(data.uri);
    }
  }

  async function handleSendPicture() {
    try {
      const dataFile = new FormData();
      dataFile.append('file', {
        uri,
        name: 'signature.jpg',
        type: 'image/jpg',
      });

      const fileResponse = await api.post('files', dataFile);

      const { id } = fileResponse.data;

      await api.put(`deliverymen/${userId}/deliveries/${deliveryId}/finish`, {
        signature_id: id,
      });

      ToastAndroid.show('A imagem foi enviada!', ToastAndroid.SHORT);
      navigation.navigate('Deliveries');
    } catch (error) {
      console.tron.error(error);
      ToastAndroid.show(
        'Erro ao enviar imagem, tente novamente!',
        ToastAndroid.LONG
      );
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        <CameraWrapper>
          {uri ? (
            <>
              <Image source={{ uri }} style={{ height: '100%' }} />

              <PictureButton onPress={() => setUri('')}>
                <Icon name="close" color="#fff" size={30} />
              </PictureButton>
            </>
          ) : (
            <>
              <Camera ref={cameraRef} />
              <PictureButton onPress={handleTakePicture}>
                <Icon name="camera" color="#fff" size={30} />
              </PictureButton>
            </>
          )}
        </CameraWrapper>
        <SendButton onPress={handleSendPicture}>Enviar</SendButton>
      </Content>
    </Container>
  );
}
