import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import colors from '~/util/colors';

// import { Container } from './styles';

export default function StatusIndicator({ currentPosition }) {
  const labels = ['Aguardando\nRetirada', 'Retirada', 'Entregue'];

  const customStyles = {
    stepIndicatorSize: 9,
    currentStepIndicatorSize: 9,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.primary,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: colors.primary,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999',
    labelSize: 8,

    currentStepLabelColor: '#999',
  };

  return (
    <View style={{ paddingTop: 24, paddingBottom: 10 }}>
      <StepIndicator
        stepCount={3}
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
      />
    </View>
  );
}
