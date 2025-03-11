import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ErrorMessage({errorValue}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorValue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        // backgroundColor: 'red',
        marginHorizontal: 0,
        // fontWeight: 'bold',
    }
})