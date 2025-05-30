import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  useColorScheme
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
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View 
              style={[
                styles.dialog, 
                { backgroundColor: isDark ? '#2D2C32' : '#FFFFFF' }
              ]}
            >
              <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {title}
              </Text>
              <Text style={[styles.message, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                {message}
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}
                >
                  <Text style={[styles.buttonText, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
                    {cancelLabel}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.button, 
                    danger ? styles.dangerButton : styles.confirmButton,
                    { backgroundColor: danger ? '#B3261E' : '#6750A4' }
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#6750A4',
  },
  dangerButton: {
    backgroundColor: '#B3261E',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  confirmText: {
    color: '#FFFFFF',
  },
});

export default AlertDialog;