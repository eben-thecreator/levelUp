import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  useColorScheme,
  Platform,
} from 'react-native';
import { colors } from '@/utils/colors';

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
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.overlay, { backgroundColor: 'rgba(15, 23, 42, 0.4)' }]}>
          <TouchableWithoutFeedback>
            <View 
              style={[
                styles.dialog, 
                { 
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }
              ]}
            >
              <Text style={[styles.title, { color: theme.text }]}>
                {title}
              </Text>
              
              <Text style={[styles.message, { color: theme.textSecondary }]}>
                {message}
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.cancelButton,
                    { borderColor: theme.border }
                  ]}
                  onPress={onCancel}
                >
                  <Text style={[styles.buttonText, { color: theme.text }]}>
                    {cancelLabel}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.confirmButton,
                    { 
                      backgroundColor: danger ? theme.error : theme.primary,
                      borderColor: danger ? theme.error : theme.primary,
                    }
                  ]}
                  onPress={onConfirm}
                >
                  <Text style={[styles.buttonText, styles.confirmText]}>
                    {confirmLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#7C3AED',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});

export default AlertDialog;