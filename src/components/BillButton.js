import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function BillButton({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#009',
    height: 40,
    padding: 0,
  },
  text: {
    color: '#000',
    fontSize: 15,
    lineHeight: 26,
    margin: 0,
  },
})
