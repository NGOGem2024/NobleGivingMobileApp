import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated
} from 'react-native';
import axios from 'axios';
import { EndPoint } from '../services/apiServices';
import Icon from 'react-native-vector-icons/Feather';
import api from '../services/apiClient';

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userEmail } = route.params;
  const [isLoading,setIsLoading] = useState(false);
  
  // Add animation value for smooth transitions
  const keyboardHeight = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height,
          duration: 250, 
          useNativeDriver: false,
        }).start();
      }
    );
    
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );
    
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(EndPoint.reset_password, {
        userEmail,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password reset successfully.');
        navigation.navigate('Login');
      } else {
        throw new Error(response.data.message || 'Failed to reset password');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    } finally{
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* <Animated.View 
            style={[
              styles.animatedContainer,
              {
                paddingBottom: Platform.OS === 'android' ? keyboardHeight.interpolate({
                  inputRange: [0, 300], 
                  outputRange: [0, 300], 
                  extrapolate: 'clamp'
                }) : 0
              }
            ]}
          > */}
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.content}>
                <Text style={styles.title}>Reset your password</Text>
                <Text style={styles.subtitle}>Create your new password</Text>
                
                <View style={styles.inputWrapper}>
                  <Icon name="lock" size={20} color="#A0AEC0" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    placeholderTextColor="#A0AEC0"
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#A0AEC0" 
                      style={styles.visibilityIcon}
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.inputWrapper}>
                  <Icon name="lock" size={20} color="#A0AEC0" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    placeholderTextColor="#A0AEC0"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Icon 
                      name={showConfirmPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#A0AEC0" 
                      style={styles.visibilityIcon}
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={isLoading}>
                    <Text style={styles.resetButtonText}>
                      {isLoading?'Updating...':'Update Password'}
                      </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          {/* </Animated.View> */}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  // animatedContainer: {
  //   flex: 1
  // },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight:'100%'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    minHeight:'100%'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#164860',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF'
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#2D3748'
  },
  visibilityIcon: {
    padding: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16
  },
  backButton: {
    backgroundColor: '#CBD5E0',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    width: '48%'
  },
  backButtonText: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '600'
  },
  resetButton: {
    backgroundColor: '#164860',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    width: '48%'
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ResetPasswordScreen;
