import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NGOHome = () => {
  return (
    <View style={styles.container}>
      <Text>NGOHome</Text>
    </View>
  )
}

export default NGOHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})