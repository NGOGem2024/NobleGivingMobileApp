import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import api from '../../services/apiClient';
import { EndPoint } from '../../services/apiServices';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  NGOLogin: undefined;
  NGOHome: undefined;
};

type NgoOTPVerificationNavigationProp = StackNavigationProp<RootStackParamList, 'NGOLogin'>;

interface NgoOTPVerificationProps {
  route: {
    params: {
      email: string;
    };
  };
}

const NgoOTPVerification: React.FC<NgoOTPVerificationProps> = ({ route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigation = useNavigation<NgoOTPVerificationNavigationProp>();

  useEffect(() => {
    // Start countdown timer for resend OTP
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(EndPoint.ngo_login_verify_otp, { email, otp });
      
      if (response.data.success) {
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);
        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'NGOHome' }],
          })
        );
      } else {
        Alert.alert('Error', response.data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    try {
      const response = await api.post(EndPoint.ngo_login_resend_otp, { email });
      
      if (response.data.success) {
        Alert.alert('Success', 'OTP has been resent to your email');
        setCountdown(30); // Reset countdown
      } else {
        Alert.alert('Error', response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP Error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to {email}</Text>
      
      <OTPInputView
        style={styles.otpInput}
        pinCount={6}
        code={otp}
        onCodeChanged={setOtp}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleVerifyOTP}
        disabled={loading || otp.length !== 6}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resendButton}
        onPress={handleResendOTP}
        disabled={countdown > 0 || resendLoading}
      >
        {resendLoading ? (
          <ActivityIndicator color="#164860" />
        ) : (
          <Text style={styles.resendText}>
            {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  otpInput: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#164860',
    borderRadius: 5,
    color: '#000',
    fontSize: 18,
  },
  underlineStyleHighLighted: {
    borderColor: '#164860',
  },
  button: {
    backgroundColor: '#164860',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    color: '#164860',
    fontWeight: 'bold',
  },
});

export default NgoOTPVerification;