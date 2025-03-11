import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';

interface FormInputProps {
    placeholder: string;
    name: string;
    onChangeText: any;
    onBlur: any;
    value: string;
    secureTextEntry?: boolean;
}

export default function FormInput({placeholder, name, secureTextEntry, ...rest}:FormInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  // Check if this is a password field
  const isPasswordField = secureTextEntry !== undefined;

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.iconContainer}>
          <Icon 
            name={isPasswordField ? 'lock' : 'user'} 
            size={20} 
            color="#164860" 
          />
        </View>
        
        <TextInput
          style={styles.input}
          {...rest}
          placeholderTextColor="grey"
          placeholder={placeholder}
          secureTextEntry={isPasswordField && !isPasswordVisible}
        />
        
        {isPasswordField && (
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon 
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#164860"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 0,
        marginBottom: -2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    iconContainer: {
        padding: 15,
    },
    input: {
        flex: 1,
        padding: 15,
    },
    eyeIcon: {
        padding: 15,
    },
});

// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React from 'react'
// import Icon from 'react-native-vector-icons/Feather';

// interface FormInputProps {
//     placeholder: string;
//     name: string;
//     onChangeText: any;
//     onBlur: any;
//     value: string;
//     secureTextEntry?: boolean;
//   }

// export default function FormInput({placeholder, ...rest}:FormInputProps) {
//   return (
//     <View style={styles.inputContainer}>
//       <TextInput
//       style={styles.input}
//       {...rest}
//       placeholderTextColor="grey"

//         placeholder={placeholder}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     inputContainer: {
//         marginHorizontal: 0,
//     },
//     input: {
//         backgroundColor: '#f5f5f5',
//         borderRadius: 10,
//         padding: 15,
//     },
// });