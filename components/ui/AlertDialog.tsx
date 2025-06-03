import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  useColorScheme,
  Animated
} from 'react-native';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

const AlertDialog = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  danger = false,
}: AlertDialogProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [animation] = React.useState(new Animated.Value(0));
  
  React.useEffect(() => {
    if (visible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }).start();
    } else {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }).start();
    }
  }, [visible]);
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)' }]}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.dialog, 
                { 
                  backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
                  transform: [
                    {
                      scale: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                  ],
                  opacity: animation,
                }
              ]}
            >
              <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {title}
              </Text>
              <Text style={[styles.message, { color: isDark ? '#98989F' : '#8E8E93' }]}>
                {message}
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}
                >
                  <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                    {cancelLabel}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: danger ? (isDark ? '#FF453A' : '#FF3B30') : (isDark ? '#0A84FF' : '#007AFF') }
                  ]}
                  onPress={onConfirm}
                >
                  <Text style={[styles.buttonText, styles.confirmText]}>
                    {confirmLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    width: '100%',
    maxWidth: 270,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});

export default AlertDialog;