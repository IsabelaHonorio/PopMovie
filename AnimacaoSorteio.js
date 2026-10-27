import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from './theme';

const DURACAO_QUADRO = 260;

export default function AnimacaoSorteio({ visible, runId, onComplete }) {
  const { background } = useTheme();
  const { width, height } = useWindowDimensions();
  const [quadro, setQuadro] = useState(0);
  const onCompleteRef = useRef(onComplete);

  const larguraQuadro = Math.min(width * 0.85, height * 0.35);
  const alturaQuadro = larguraQuadro * 2;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return undefined;

    setQuadro(0);
    let quadroAtual = 0;
    let timer;

    const avancarQuadro = () => {
      timer = setTimeout(() => {
        quadroAtual += 1;
        if (quadroAtual >= 3) {
          onCompleteRef.current();
          return;
        }

        setQuadro(quadroAtual);
        avancarQuadro();
      }, DURACAO_QUADRO);
    };

    avancarQuadro();
    return () => clearTimeout(timer);
  }, [runId, visible]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={() => {}}
    >
      <View style={[styles.fundo, { backgroundColor: background }]}>
        <View
          style={[
            styles.areaQuadro,
            { width: larguraQuadro, height: alturaQuadro },
          ]}
        >
          <Image
            source={require('./assets/pipoca-sorteio.png')}
            style={{
              position: 'absolute',
              top: 0,
              left: -larguraQuadro * quadro,
              width: larguraQuadro * 3,
              height: alturaQuadro,
            }}
            resizeMode="stretch"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  areaQuadro: {
    overflow: 'hidden',
  },
});
