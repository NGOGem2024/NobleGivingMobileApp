import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EndPoint } from '../services/apiServices';
import api from '../services/apiClient';

interface OtpVerificationProps {
  onVerificationSuccess: () => void;
  onBackPress: () => void;
  navigation: any;
  route: any;
}

const OtpVerification: React.FC<OtpVerificationProps & {navigation:any;route:any}> = ({ 
  onVerificationSuccess, 
  onBackPress,
  navigation,
  route 
}) => {
  const [otp, setOtpCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userEmail } = route.params;

  const verifyOtpCode = async (): Promise<void> => {
    if (otp.length === 0) {
      Alert.alert('Error', 'Please enter verification code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(EndPoint.verify_otp, {
        otp,
        userEmail
      });
      
      if (response.status === 200) {
        navigation.navigate('ResetPassword', { userEmail });
      } else {
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error) {
      if (error instanceof TypeError) {
        Alert.alert('Network Error', 'Please check your internet connection');
      } else if (error instanceof Error) {
        Alert.alert('Verification Failed', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code sent to your email</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={setOtpCode}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>  

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackPress}
          disabled={isLoading}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={verifyOtpCode}
          disabled={isLoading}
        >
          <Text style={styles.verifyButtonText}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#A0AEC0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#164860',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OtpVerification;