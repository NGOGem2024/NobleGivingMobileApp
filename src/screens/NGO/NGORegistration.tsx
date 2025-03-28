// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Formik, FormikProps, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import Icon from 'react-native-vector-icons/Feather';

// // Form interfaces
// interface FormStep1Values {
//   ngoName: string;
//   registrationId: string;
//   password: string;
//   confirmPassword: string;
//   email: string;
//   otp: string;
// }

// interface FormStep2Values {
//   city: string;
//   authorizedPersonName: string;
//   authorizedPersonEmail: string;
//   website: string;
//   contactNumber: string;
// }

// interface FormValues extends FormStep1Values, FormStep2Values {}

// // Validation schemas
// const Step1ValidationSchema = Yup.object().shape({
//   ngoName: Yup.string().required('NGO name is required'),
//   registrationId: Yup.string().required('Registration ID is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required'),
//   email: Yup.string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   otp: Yup.string().when('otpSent', {
//     is: true,
//     then: (schema) => schema.required('OTP is required'),
//     otherwise: (schema) => schema,
//   }),
// });

// const Step2ValidationSchema = Yup.object().shape({
//   city: Yup.string().required('City is required'),
//   authorizedPersonName: Yup.string().required('Authorized person name is required'),
//   authorizedPersonEmail: Yup.string()
//     .email('Enter a valid email')
//     .required('Authorized person email is required'),
//   website: Yup.string().url('Enter a valid URL'),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Contact number is required'),
// });

// const NGORegistration = () => {
//   const [step, setStep] = useState(1);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const formikRef = useRef<FormikProps<FormValues>>(null);

//   const initialValues: FormValues = {
//     ngoName: '',
//     registrationId: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     otp: '',
//     city: '',
//     authorizedPersonName: '',
//     authorizedPersonEmail: '',
//     website: '',
//     contactNumber: '',
//   };

//   const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
//     console.log('Form submitted with values:', values);
//     setStep(3); // Move to welcome screen after successful submission
//     actions.setSubmitting(false);
//   };

//   const sendOTP = async () => {
//     if (!formikRef.current) return;

//     const { email } = formikRef.current.values;
//     const isValidEmail = await Yup.string().email().isValid(email);

//     if (!isValidEmail) {
//       formikRef.current.setFieldError('email', 'Please enter a valid email address');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate OTP sending
//     setTimeout(() => {
//       setOtpSent(true);
//       setIsSubmitting(false);
//       // In a real scenario, you would send an OTP to the email
//       console.log(`OTP sent to ${email}`);
//     }, 1500);
//   };

//   const verifyOTP = () => {
//     if (!formikRef.current) return;

//     const { otp } = formikRef.current.values;
    
//     if (!otp) {
//       formikRef.current.setFieldError('otp', 'Please enter OTP');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate OTP verification
//     setTimeout(() => {
//       setOtpVerified(true);
//       setIsSubmitting(false);
//       // In a real scenario, you would verify the OTP
//       console.log('OTP verified');
//     }, 1500);
//   };

//   const renderStep = (formikProps: FormikProps<FormValues>) => {
//     const {
//       handleChange,
//       handleBlur,
//       handleSubmit,
//       values,
//       errors,
//       touched,
//       isValid,
//       dirty,
//     } = formikProps;

//     const hasErrors = (fieldName: string) => {
//       return touched[fieldName as keyof FormValues] && errors[fieldName as keyof FormValues];
//     };

//     switch (step) {
//       case 1:
//         return (
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="briefcase" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Name"
//                   value={values.ngoName}
//                   onChangeText={handleChange('ngoName')}
//                   onBlur={handleBlur('ngoName')}
//                 />
//               </View>
//               {hasErrors('ngoName') && (
//                 <Text style={styles.errorText}>{errors.ngoName}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="file-text" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Registration ID"
//                   value={values.registrationId}
//                   onChangeText={handleChange('registrationId')}
//                   onBlur={handleBlur('registrationId')}
//                 />
//               </View>
//               {hasErrors('registrationId') && (
//                 <Text style={styles.errorText}>{errors.registrationId}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   value={values.password}
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   secureTextEntry
//                 />
//               </View>
//               {hasErrors('password') && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm Password"
//                   value={values.confirmPassword}
//                   onChangeText={handleChange('confirmPassword')}
//                   onBlur={handleBlur('confirmPassword')}
//                   secureTextEntry
//                 />
//               </View>
//               {hasErrors('confirmPassword') && (
//                 <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.emailContainer}>
//                 <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
//                   <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="NGO Email"
//                     value={values.email}
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     editable={!otpSent}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   style={[
//                     styles.otpButton,
//                     (!values.email || isSubmitting || otpVerified) && styles.disabledButton,
//                   ]}
//                   onPress={sendOTP}
//                   disabled={!values.email || isSubmitting || otpVerified}
//                 >
//                   {isSubmitting && !otpSent ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <Text style={styles.otpButtonText}>
//                       {otpSent ? 'Resend' : 'Send OTP'}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//               {hasErrors('email') && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}
//             </View>

//             {otpSent && (
//               <View style={styles.inputContainer}>
//                 <View style={styles.emailContainer}>
//                   <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
//                     <Icon name="hash" size={20} color="#164068" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter OTP"
//                       value={values.otp}
//                       onChangeText={handleChange('otp')}
//                       onBlur={handleBlur('otp')}
//                       keyboardType="numeric"
//                       editable={!otpVerified}
//                     />
//                   </View>
//                   <TouchableOpacity
//                     style={[
//                       styles.otpButton,
//                       (!values.otp || isSubmitting || otpVerified) && styles.disabledButton,
//                       otpVerified && styles.verifiedButton,
//                     ]}
//                     onPress={verifyOTP}
//                     disabled={!values.otp || isSubmitting || otpVerified}
//                   >
//                     {isSubmitting && otpSent && !otpVerified ? (
//                       <ActivityIndicator size="small" color="#fff" />
//                     ) : (
//                       <Text style={styles.otpButtonText}>
//                         {otpVerified ? 'Verified' : 'Verify'}
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 </View>
//                 {hasErrors('otp') && (
//                   <Text style={styles.errorText}>{errors.otp}</Text>
//                 )}
//               </View>
//             )}

//             <TouchableOpacity
//               style={[
//                 styles.nextButton,
//                 (!isValid || !otpVerified) && styles.disabledButton,
//               ]}
//               onPress={() => setStep(2)}
//               disabled={!isValid || !otpVerified}
//             >
//               <Text style={styles.buttonText}>Next</Text>
//               <Icon name="arrow-right" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         );

//       case 2:
//         return (
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="map-pin" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO City"
//                   value={values.city}
//                   onChangeText={handleChange('city')}
//                   onBlur={handleBlur('city')}
//                 />
//               </View>
//               {hasErrors('city') && (
//                 <Text style={styles.errorText}>{errors.city}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="user" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Name"
//                   value={values.authorizedPersonName}
//                   onChangeText={handleChange('authorizedPersonName')}
//                   onBlur={handleBlur('authorizedPersonName')}
//                 />
//               </View>
//               {hasErrors('authorizedPersonName') && (
//                 <Text style={styles.errorText}>{errors.authorizedPersonName}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Email"
//                   value={values.authorizedPersonEmail}
//                   onChangeText={handleChange('authorizedPersonEmail')}
//                   onBlur={handleBlur('authorizedPersonEmail')}
//                 />
//               </View>
//               {hasErrors('authorizedPersonEmail') && (
//                 <Text style={styles.errorText}>{errors.authorizedPersonEmail}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="globe" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Website (Optional)"
//                   value={values.website}
//                   onChangeText={handleChange('website')}
//                   onBlur={handleBlur('website')}
//                 />
//               </View>
//               {hasErrors('website') && (
//                 <Text style={styles.errorText}>{errors.website}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="phone" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Contact Number"
//                   value={values.contactNumber}
//                   onChangeText={handleChange('contactNumber')}
//                   onBlur={handleBlur('contactNumber')}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//               {hasErrors('contactNumber') && (
//                 <Text style={styles.errorText}>{errors.contactNumber}</Text>
//               )}
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => setStep(1)}
//               >
//                 <Icon name="arrow-left" size={20} color="#164068" />
//                 <Text style={styles.backButtonText}>Back</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.submitButton,
//                   (!isValid || !dirty) && styles.disabledButton,
//                 ]}
//                 onPress={() => handleSubmit()}
//                 disabled={!isValid || !dirty}
//               >
//                 <Text style={styles.buttonText}>Register</Text>
//                 <Icon name="check" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         );

//       case 3:
//         return (
//           <View style={styles.welcomeContainer}>
//             <Image
//               source={{ uri: 'https://via.placeholder.com/150' }}
//               style={styles.welcomeImage}
//             />
//             <Text style={styles.welcomeTitle}>Registration Successful!</Text>
//             <Text style={styles.welcomeText}>
//               Thank you for registering your NGO with us. Your account has been created successfully.
//             </Text>
//             <Text style={styles.welcomeSubText}>
//               A verification email has been sent to your registered email address. Please verify your account to continue.
//             </Text>
//             <TouchableOpacity style={styles.loginButton}>
//               <Text style={styles.buttonText}>Go to Login</Text>
//               <Icon name="log-in" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../../assets/fullnamelogo.png')} 
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>Give us few required details to get started!</Text>
//       </View>

//       <View style={styles.stepIndicatorContainer}>
//         <View style={[
//           styles.stepDot, 
//           step >= 1 && styles.activeStepDot
//         ]}></View>
//         <View style={[
//           styles.stepLine, 
//           step >= 2 && styles.activeStepLine
//         ]}></View>
//         <View style={[
//           styles.stepDot, 
//           step >= 2 && styles.activeStepDot
//         ]}></View>
//         <View style={[
//           styles.stepLine, 
//           step === 3 && styles.activeStepLine
//         ]}></View>
//         <View style={[
//           styles.stepDot, 
//           step === 3 && styles.activeStepDot
//         ]}></View>
//       </View>

//       <Formik
//         innerRef={formikRef}
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={step === 1 ? Step1ValidationSchema : Step2ValidationSchema}
//         validateOnChange={false}
//         validateOnBlur={true}
//       >
//         {(formikProps) => renderStep(formikProps)}
//       </Formik>

//       {step < 3 && (
//         <View style={styles.loginLinkContainer}>
//           <Text style={styles.loginLinkText}>Already have account? </Text>
//           <TouchableOpacity>
//             <Text style={styles.loginLink}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   contentContainer: {
//     paddingBottom: 30,
//   },
//   header: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   logo: {
//     width: 300,
//     height: 200,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   stepIndicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   stepDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#ddd',
//   },
//   activeStepDot: {
//     backgroundColor: '#164068',
//   },
//   stepLine: {
//     height: 2,
//     width: 40,
//     backgroundColor: '#ddd',
//     marginHorizontal: 10,
//   },
//   activeStepLine: {
//     backgroundColor: '#164068',
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 10,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     borderRadius: 10,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   emailInputContainer: {
//     flex: 1,
//   },
//   otpButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   nextButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   submitButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   backButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#164068',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginRight: 5,
//   },
//   backButtonText: {
//     color: '#164068',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//     borderColor: '#cccccc',
//   },
//   verifiedButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   loginLinkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   loginLinkText: {
//     color: '#666',
//   },
//   loginLink: {
//     color: '#164068',
//     fontWeight: 'bold',
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     paddingHorizontal: 30,
//   },
//   welcomeImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#28a745',
//     marginBottom: 15,
//   },
//   welcomeText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   welcomeSubText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   loginButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     elevation: 2,
//   },
// });

// export default NGORegistration;












// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Animated,
// } from 'react-native';
// import { Formik, FormikProps, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import Icon from 'react-native-vector-icons/Feather';

// // Form interfaces
// interface FormStep1Values {
//   ngoName: string;
//   registrationId: string;
//   password: string;
//   confirmPassword: string;
//   email: string;
//   otp: string;
// }

// interface FormStep2Values {
//   city: string;
//   authorizedPersonName: string;
//   authorizedPersonEmail: string;
//   website: string;
//   contactNumber: string;
// }

// interface FormValues extends FormStep1Values, FormStep2Values {}

// // Validation schemas
// const Step1ValidationSchema = Yup.object().shape({
//   ngoName: Yup.string().required('NGO name is required'),
//   registrationId: Yup.string().required('Registration ID is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required'),
//   email: Yup.string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   otp: Yup.string().when('otpSent', {
//     is: true,
//     then: (schema) => schema.required('OTP is required'),
//     otherwise: (schema) => schema,
//   }),
// });

// const Step2ValidationSchema = Yup.object().shape({
//   city: Yup.string().required('City is required'),
//   authorizedPersonName: Yup.string().required('Authorized person name is required'),
//   authorizedPersonEmail: Yup.string()
//     .email('Enter a valid email')
//     .required('Authorized person email is required'),
//   website: Yup.string().url('Enter a valid URL'),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Contact number is required'),
// });

// const NGORegistration = () => {
//   const [step, setStep] = useState(1);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const formikRef = useRef<FormikProps<FormValues>>(null);

//   // Refactored Animated values
//   const dotAnimations = useRef({
//     dot1: {
//       scale: new Animated.Value(1),
//       color: new Animated.Value(0)
//     },
//     dot2: {
//       scale: new Animated.Value(1),
//       color: new Animated.Value(0)
//     },
//     dot3: {
//       scale: new Animated.Value(1),
//       color: new Animated.Value(0)
//     }
//   }).current;

//   const lineAnimations = useRef({
//     line1: new Animated.Value(0),
//     line2: new Animated.Value(0)
//   }).current;

//   useEffect(() => {
//     const animateDots = () => {
//       // Reset all animations
//       Object.values(dotAnimations).forEach(dot => {
//         Animated.timing(dot.scale, { 
//           toValue: 1, 
//           duration: 0, 
//           useNativeDriver: true 
//         }).start();
//         Animated.timing(dot.color, { 
//           toValue: 0, 
//           duration: 0, 
//           useNativeDriver: false 
//         }).start();
//       });

//       Animated.timing(lineAnimations.line1, { 
//         toValue: 0, 
//         duration: 0, 
//         useNativeDriver: false 
//       }).start();
//       Animated.timing(lineAnimations.line2, { 
//         toValue: 0, 
//         duration: 0, 
//         useNativeDriver: false 
//       }).start();

//       // Animate based on step
//       switch (step) {
//         case 1:
//           Animated.parallel([
//             Animated.timing(dotAnimations.dot1.scale, { 
//               toValue: 1.3, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot1.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             })
//           ]).start();
//           break;
        
//         case 2:
//           Animated.parallel([
//             Animated.timing(dotAnimations.dot1.scale, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot2.scale, { 
//               toValue: 1.3, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot1.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(dotAnimations.dot2.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(lineAnimations.line1, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             })
//           ]).start();
//           break;
        
//         case 3:
//           Animated.parallel([
//             Animated.timing(dotAnimations.dot1.scale, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot2.scale, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot3.scale, { 
//               toValue: 1.3, 
//               duration: 300, 
//               useNativeDriver: true 
//             }),
//             Animated.timing(dotAnimations.dot1.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(dotAnimations.dot2.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(dotAnimations.dot3.color, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(lineAnimations.line1, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             }),
//             Animated.timing(lineAnimations.line2, { 
//               toValue: 1, 
//               duration: 300, 
//               useNativeDriver: false 
//             })
//           ]).start();
//           break;
//       }
//     };

//     animateDots();
//   }, [step]);

//   const initialValues: FormValues = {
//     ngoName: '',
//     registrationId: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     otp: '',
//     city: '',
//     authorizedPersonName: '',
//     authorizedPersonEmail: '',
//     website: '',
//     contactNumber: '',
//   };

//   const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
//     console.log('Form submitted with values:', values);
//     setStep(3); // Move to welcome screen after successful submission
//     actions.setSubmitting(false);
//   };

//   const sendOTP = async () => {
//     if (!formikRef.current) return;

//     const { email } = formikRef.current.values;
//     const isValidEmail = await Yup.string().email().isValid(email);

//     if (!isValidEmail) {
//       formikRef.current.setFieldError('email', 'Please enter a valid email address');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate OTP sending
//     setTimeout(() => {
//       setOtpSent(true);
//       setIsSubmitting(false);
//       // In a real scenario, you would send an OTP to the email
//       console.log(`OTP sent to ${email}`);
//     }, 1500);
//   };

//   const verifyOTP = () => {
//     if (!formikRef.current) return;

//     const { otp } = formikRef.current.values;
    
//     if (!otp) {
//       formikRef.current.setFieldError('otp', 'Please enter OTP');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate OTP verification
//     setTimeout(() => {
//       setOtpVerified(true);
//       setIsSubmitting(false);
//       // In a real scenario, you would verify the OTP
//       console.log('OTP verified');
//     }, 1500);
//   };

//   const renderStep = (formikProps: FormikProps<FormValues>) => {
//     const {
//       handleChange,
//       handleBlur,
//       handleSubmit,
//       values,
//       errors,
//       touched,
//       isValid,
//       dirty,
//     } = formikProps;

//     const hasErrors = (fieldName: string) => {
//       return touched[fieldName as keyof FormValues] && errors[fieldName as keyof FormValues];
//     };

//     switch (step) {
//       case 1:
//         return (
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="briefcase" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Name"
//                   value={values.ngoName}
//                   onChangeText={handleChange('ngoName')}
//                   onBlur={handleBlur('ngoName')}
//                 />
//               </View>
//               {hasErrors('ngoName') && (
//                 <Text style={styles.errorText}>{errors.ngoName}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="file-text" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Registration ID"
//                   value={values.registrationId}
//                   onChangeText={handleChange('registrationId')}
//                   onBlur={handleBlur('registrationId')}
//                 />
//               </View>
//               {hasErrors('registrationId') && (
//                 <Text style={styles.errorText}>{errors.registrationId}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   value={values.password}
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   secureTextEntry
//                 />
//               </View>
//               {hasErrors('password') && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm Password"
//                   value={values.confirmPassword}
//                   onChangeText={handleChange('confirmPassword')}
//                   onBlur={handleBlur('confirmPassword')}
//                   secureTextEntry
//                 />
//               </View>
//               {hasErrors('confirmPassword') && (
//                 <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.emailContainer}>
//                 <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
//                   <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="NGO Email"
//                     value={values.email}
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     editable={!otpSent}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   style={[
//                     styles.otpButton,
//                     (!values.email || isSubmitting || otpVerified) && styles.disabledButton,
//                   ]}
//                   onPress={sendOTP}
//                   disabled={!values.email || isSubmitting || otpVerified}
//                 >
//                   {isSubmitting && !otpSent ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                   ) : (
//                     <Text style={styles.otpButtonText}>
//                       {otpSent ? 'Resend' : 'Send OTP'}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//               {hasErrors('email') && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}
//             </View>

//             {otpSent && (
//               <View style={styles.inputContainer}>
//                 <View style={styles.emailContainer}>
//                   <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
//                     <Icon name="hash" size={20} color="#164068" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter OTP"
//                       value={values.otp}
//                       onChangeText={handleChange('otp')}
//                       onBlur={handleBlur('otp')}
//                       keyboardType="numeric"
//                       editable={!otpVerified}
//                     />
//                   </View>
//                   <TouchableOpacity
//                     style={[
//                       styles.otpButton,
//                       (!values.otp || isSubmitting || otpVerified) && styles.disabledButton,
//                       otpVerified && styles.verifiedButton,
//                     ]}
//                     onPress={verifyOTP}
//                     disabled={!values.otp || isSubmitting || otpVerified}
//                   >
//                     {isSubmitting && otpSent && !otpVerified ? (
//                       <ActivityIndicator size="small" color="#fff" />
//                     ) : (
//                       <Text style={styles.otpButtonText}>
//                         {otpVerified ? 'Verified' : 'Verify'}
//                       </Text>
//                     )}
//                   </TouchableOpacity>
//                 </View>
//                 {hasErrors('otp') && (
//                   <Text style={styles.errorText}>{errors.otp}</Text>
//                 )}
//               </View>
//             )}

//             <TouchableOpacity
//               style={[
//                 styles.nextButton,
//                 (!isValid || !otpVerified) && styles.disabledButton,
//               ]}
//               onPress={() => setStep(2)}
//               disabled={!isValid || !otpVerified}
//             >
//               <Text style={styles.buttonText}>Next</Text>
//               <Icon name="arrow-right" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         );

//       case 2:
//         return (
//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="map-pin" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO City"
//                   value={values.city}
//                   onChangeText={handleChange('city')}
//                   onBlur={handleBlur('city')}
//                 />
//               </View>
//               {hasErrors('city') && (
//                 <Text style={styles.errorText}>{errors.city}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="user" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Name"
//                   value={values.authorizedPersonName}
//                   onChangeText={handleChange('authorizedPersonName')}
//                   onBlur={handleBlur('authorizedPersonName')}
//                 />
//               </View>
//               {hasErrors('authorizedPersonName') && (
//                 <Text style={styles.errorText}>{errors.authorizedPersonName}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Email"
//                   value={values.authorizedPersonEmail}
//                   onChangeText={handleChange('authorizedPersonEmail')}
//                   onBlur={handleBlur('authorizedPersonEmail')}
//                 />
//               </View>
//               {hasErrors('authorizedPersonEmail') && (
//                 <Text style={styles.errorText}>{errors.authorizedPersonEmail}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="globe" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="NGO Website (Optional)"
//                   value={values.website}
//                   onChangeText={handleChange('website')}
//                   onBlur={handleBlur('website')}
//                 />
//               </View>
//               {hasErrors('website') && (
//                 <Text style={styles.errorText}>{errors.website}</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <View style={styles.inputWithIcon}>
//                 <Icon name="phone" size={20} color="#164068" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Authorized Person Contact Number"
//                   value={values.contactNumber}
//                   onChangeText={handleChange('contactNumber')}
//                   onBlur={handleBlur('contactNumber')}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//               {hasErrors('contactNumber') && (
//                 <Text style={styles.errorText}>{errors.contactNumber}</Text>
//               )}
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => setStep(1)}
//               >
//                 <Icon name="arrow-left" size={20} color="#164068" />
//                 <Text style={styles.backButtonText}>Back</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.submitButton,
//                   (!isValid || !dirty) && styles.disabledButton,
//                 ]}
//                 onPress={() => handleSubmit()}
//                 disabled={!isValid || !dirty}
//               >
//                 <Text style={styles.buttonText}>Register</Text>
//                 <Icon name="check" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         );

//       case 3:
//         return (
//           <View style={styles.welcomeContainer}>
//             <Image
//               source={{ uri: 'https://via.placeholder.com/150' }}
//               style={styles.welcomeImage}
//             />
//             <Text style={styles.welcomeTitle}>Registration Successful!</Text>
//             <Text style={styles.welcomeText}>
//               Thank you for registering your NGO with us. Your account has been created successfully.
//             </Text>
//             <Text style={styles.welcomeSubText}>
//               A verification email has been sent to your registered email address. Please verify your account to continue.
//             </Text>
//             <TouchableOpacity style={styles.loginButton}>
//               <Text style={styles.buttonText}>Go to Login</Text>
//               <Icon name="log-in" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../../assets/fullnamelogo.png')} 
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>Give us few required details to get started!</Text>
//       </View>

//       <View style={styles.stepIndicatorContainer}>
//         <Animated.View 
//           style={[
//             styles.stepDot, 
//             {
//               transform: [{ 
//                 scale: dotAnimations.dot1.scale 
//               }],
//               backgroundColor: dotAnimations.dot1.color.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['#ddd', '#164068']
//               })
//             }
//           ]} 
//         />
//         <Animated.View 
//           style={[
//             styles.stepLine, 
//             {
//               backgroundColor: lineAnimations.line1.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['#ddd', '#164068']
//               })
//             }
//           ]}
//         />
//         <Animated.View 
//           style={[
//             styles.stepDot, 
//             {
//               transform: [{ 
//                 scale: dotAnimations.dot2.scale 
//               }],
//               backgroundColor: dotAnimations.dot2.color.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['#ddd', '#164068']
//               })
//             }
//           ]} 
//         />
//         <Animated.View 
//           style={[
//             styles.stepLine, 
//             {
//               backgroundColor: lineAnimations.line2.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['#ddd', '#164068']
//               })
//             }
//           ]}
//         />
//         <Animated.View 
//           style={[
//             styles.stepDot, 
//             {
//               transform: [{ 
//                 scale: dotAnimations.dot3.scale 
//               }],
//               backgroundColor: dotAnimations.dot3.color.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ['#ddd', '#164068']
//               })
//             }
//           ]} 
//         />
//       </View>

//       <Formik
//         innerRef={formikRef}
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={step === 1 ? Step1ValidationSchema : Step2ValidationSchema}
//         validateOnChange={false}
//         validateOnBlur={true}
//       >
//         {(formikProps) => renderStep(formikProps)}
//       </Formik>

//       {step < 3 && (
//         <View style={styles.loginLinkContainer}>
//           <Text style={styles.loginLinkText}>Already have account? </Text>
//           <TouchableOpacity>
//             <Text style={styles.loginLink}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   contentContainer: {
//     paddingBottom: 30,
//   },
//   header: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   logo: {
//     width: 300,
//     height: 200,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   stepIndicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   stepDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#ddd',
//   },
//   activeStepDot: {
//     backgroundColor: '#164068',
//   },
//   stepLine: {
//     height: 2,
//     width: 40,
//     backgroundColor: '#ddd',
//     marginHorizontal: 10,
//   },
//   activeStepLine: {
//     backgroundColor: '#164068',
//   },
//   formContainer: {
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     paddingHorizontal: 10,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     borderRadius: 10,
//   },
//   emailContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   emailInputContainer: {
//     flex: 1,
//   },
//   otpButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   nextButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   submitButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   backButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#164068',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginRight: 5,
//   },
//   backButtonText: {
//     color: '#164068',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//     borderColor: '#cccccc',
//   },
//   verifiedButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   loginLinkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   loginLinkText: {
//     color: '#666',
//   },
//   loginLink: {
//     color: '#164068',
//     fontWeight: 'bold',
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     paddingHorizontal: 30,
//   },
//   welcomeImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 20,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#28a745',
//     marginBottom: 15,
//   },
//   welcomeText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   welcomeSubText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   loginButton: {
//     backgroundColor: '#164068',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     elevation: 2,
//   },
// });

// export default NGORegistration;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

// Form interfaces
interface FormStep1Values {
  ngoName: string;
  registrationId: string;
  password: string;
  confirmPassword: string;
  email: string;
  otp: string;
}

interface FormStep2Values {
  city: string;
  authorizedPersonName: string;
  authorizedPersonEmail: string;
  website: string;
  contactNumber: string;
}

interface FormValues extends FormStep1Values, FormStep2Values {}

// Validation schemas
const Step1ValidationSchema = Yup.object().shape({
  ngoName: Yup.string().required('NGO name is required'),
  registrationId: Yup.string().required('Registration ID is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  otp: Yup.string().when('otpSent', {
    is: true,
    then: (schema) => schema.required('OTP is required'),
    otherwise: (schema) => schema,
  }),
});

const Step2ValidationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  authorizedPersonName: Yup.string().required('Authorized person name is required'),
  authorizedPersonEmail: Yup.string()
    .email('Enter a valid email')
    .required('Authorized person email is required'),
  website: Yup.string().url('Enter a valid URL'),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Contact number is required'),
});

const NGORegistration = () => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formikRef = useRef<FormikProps<FormValues>>(null);
  
  // Animation values for dots
  const dot1Anim = useRef(new Animated.Value(1)).current;
  const dot2Anim = useRef(new Animated.Value(0.5)).current;
  const dot3Anim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Animate dots when step changes
    Animated.parallel([
      Animated.spring(dot1Anim, {
        toValue: step >= 1 ? 1 : 0.5,
        useNativeDriver: true,
      }),
      Animated.spring(dot2Anim, {
        toValue: step >= 2 ? 1 : 0.5,
        useNativeDriver: true,
      }),
      Animated.spring(dot3Anim, {
        toValue: step >= 3 ? 1 : 0.5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const initialValues: FormValues = {
    ngoName: '',
    registrationId: '',
    password: '',
    confirmPassword: '',
    email: '',
    otp: '',
    city: '',
    authorizedPersonName: '',
    authorizedPersonEmail: '',
    website: '',
    contactNumber: '',
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form submitted with values:', values);
    setStep(3);
    actions.setSubmitting(false);
  };

  const sendOTP = async () => {
    if (!formikRef.current) return;

    const { email } = formikRef.current.values;
    const isValidEmail = await Yup.string().email().isValid(email);

    if (!isValidEmail) {
      formikRef.current.setFieldError('email', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setOtpSent(true);
      setIsSubmitting(false);
      console.log(`OTP sent to ${email}`);
    }, 1500);
  };

  const verifyOTP = () => {
    if (!formikRef.current) return;

    const { otp } = formikRef.current.values;
    
    if (!otp) {
      formikRef.current.setFieldError('otp', 'Please enter OTP');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setOtpVerified(true);
      setIsSubmitting(false);
      console.log('OTP verified');
    }, 1500);
  };

  const renderStep = (formikProps: FormikProps<FormValues>) => {
    const {
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      isValid,
      dirty,
    } = formikProps;

    const hasErrors = (fieldName: string) => {
      return touched[fieldName as keyof FormValues] && errors[fieldName as keyof FormValues];
    };

    switch (step) {
      case 1:
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="briefcase" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="NGO Name"
                  value={values.ngoName}
                  onChangeText={handleChange('ngoName')}
                  onBlur={handleBlur('ngoName')}
                />
              </View>
              {hasErrors('ngoName') && (
                <Text style={styles.errorText}>{errors.ngoName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="file-text" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="NGO Registration ID"
                  value={values.registrationId}
                  onChangeText={handleChange('registrationId')}
                  onBlur={handleBlur('registrationId')}
                />
              </View>
              {hasErrors('registrationId') && (
                <Text style={styles.errorText}>{errors.registrationId}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
              </View>
              {hasErrors('password') && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="lock" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                />
              </View>
              {hasErrors('confirmPassword') && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.emailContainer}>
                <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
                  <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="NGO Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    editable={!otpSent}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.otpButton,
                    (!values.email || isSubmitting || otpVerified) && styles.disabledButton,
                  ]}
                  onPress={sendOTP}
                  disabled={!values.email || isSubmitting || otpVerified}
                >
                  {isSubmitting && !otpSent ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.otpButtonText}>
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              {hasErrors('email') && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {otpSent && (
              <View style={styles.inputContainer}>
                <View style={styles.emailContainer}>
                  <View style={[styles.inputWithIcon, styles.emailInputContainer]}>
                    <Icon name="hash" size={20} color="#164068" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      value={values.otp}
                      onChangeText={handleChange('otp')}
                      onBlur={handleBlur('otp')}
                      keyboardType="numeric"
                      editable={!otpVerified}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.otpButton,
                      (!values.otp || isSubmitting || otpVerified) && styles.disabledButton,
                      otpVerified && styles.verifiedButton,
                    ]}
                    onPress={verifyOTP}
                    disabled={!values.otp || isSubmitting || otpVerified}
                  >
                    {isSubmitting && otpSent && !otpVerified ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.otpButtonText}>
                        {otpVerified ? 'Verified' : 'Verify'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                {hasErrors('otp') && (
                  <Text style={styles.errorText}>{errors.otp}</Text>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.nextButton,
                (!isValid || !otpVerified) && styles.disabledButton,
              ]}
              onPress={() => setStep(2)}
              disabled={!isValid || !otpVerified}
            >
              <Text style={styles.buttonText}>Next</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="map-pin" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="NGO City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                />
              </View>
              {hasErrors('city') && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="user" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Authorized Person Name"
                  value={values.authorizedPersonName}
                  onChangeText={handleChange('authorizedPersonName')}
                  onBlur={handleBlur('authorizedPersonName')}
                />
              </View>
              {hasErrors('authorizedPersonName') && (
                <Text style={styles.errorText}>{errors.authorizedPersonName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="mail" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Authorized Person Email"
                  value={values.authorizedPersonEmail}
                  onChangeText={handleChange('authorizedPersonEmail')}
                  onBlur={handleBlur('authorizedPersonEmail')}
                />
              </View>
              {hasErrors('authorizedPersonEmail') && (
                <Text style={styles.errorText}>{errors.authorizedPersonEmail}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="globe" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="NGO Website (Optional)"
                  value={values.website}
                  onChangeText={handleChange('website')}
                  onBlur={handleBlur('website')}
                />
              </View>
              {hasErrors('website') && (
                <Text style={styles.errorText}>{errors.website}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWithIcon}>
                <Icon name="phone" size={20} color="#164068" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Authorized Person Contact Number"
                  value={values.contactNumber}
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  keyboardType="phone-pad"
                />
              </View>
              {hasErrors('contactNumber') && (
                <Text style={styles.errorText}>{errors.contactNumber}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(1)}
              >
                <Icon name="arrow-left" size={20} color="#164068" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!isValid || !dirty) && styles.disabledButton,
                ]}
                onPress={() => handleSubmit()}
                disabled={!isValid || !dirty}
              >
                <Text style={styles.buttonText}>Register</Text>
                <Icon name="check" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.welcomeImage}
            />
            <Text style={styles.welcomeTitle}>Registration Successful!</Text>
            <Text style={styles.welcomeText}>
              Thank you for registering your NGO with us. Your account has been created successfully.
            </Text>
            <Text style={styles.welcomeSubText}>
              A verification email has been sent to your registered email address. Please verify your account to continue.
            </Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.buttonText}>Go to Login</Text>
              <Icon name="log-in" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/fullnamelogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Give us few required details to get started!</Text>
      </View>

      <View style={styles.stepIndicatorContainer}>
        <Animated.View 
          style={[
            styles.stepDot, 
            step >= 1 && styles.activeStepDot,
            {
              transform: [{ scale: dot1Anim }]
            }
          ]}
        />
        <View style={[styles.stepLine, step >= 2 && styles.activeStepLine]} />
        <Animated.View 
          style={[
            styles.stepDot, 
            step >= 2 && styles.activeStepDot,
            {
              transform: [{ scale: dot2Anim }]
            }
          ]}
        />
        <View style={[styles.stepLine, step === 3 && styles.activeStepLine]} />
        <Animated.View 
          style={[
            styles.stepDot, 
            step === 3 && styles.activeStepDot,
            {
              transform: [{ scale: dot3Anim }]
            }
          ]}
        />
      </View>

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={step === 1 ? Step1ValidationSchema : Step2ValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {(formikProps) => renderStep(formikProps)}
      </Formik>

      {step < 3 && (
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Already have account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  activeStepDot: {
    backgroundColor: '#164068',
  },
  stepLine: {
    height: 2,
    width: 40,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  activeStepLine: {
    backgroundColor: '#164068',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInputContainer: {
    flex: 1,
  },
  otpButton: {
    backgroundColor: '#164068',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  otpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: '#164068',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#164068',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  backButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#164068',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  backButtonText: {
    color: '#164068',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  verifiedButton: {
    backgroundColor: '#28a745',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    color: '#666',
  },
  loginLink: {
    color: '#164068',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#164068',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 2,
  },
});

export default NGORegistration;
