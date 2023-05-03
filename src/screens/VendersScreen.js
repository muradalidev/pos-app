import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Modal, Text, ScrollView, Picker } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AddVenderButton from '../components/AddVenderButton';
import Background from '../components/Background';
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import Header from '../components/Header'
import InvoiceButton from '../components/InvoiceButton';

const tableData = {
    tableHead: ['Balance in USD', 'Balance in IQ', 'Vender name'],
    tableFooter: ['10000', '200', 'Sum'],
    tableData: [
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['100', '10', 'Vender1'],
        ['200', '20', 'Vender2'],
        ['300', '30', 'Vender3'],
        ['400', '40', 'Vender4'],
        ['500', '50', 'Vender5'],
        ['50000', '500', 'SUM'],
    ],
};


export default function VendersScreen({ toggle }) {

  const [data, setData] = useState(tableData);
 
  // Part of Add Modal  
  const [isAddModalVisible, setAddModalVisible] = useState({ value: false, error: '' })
  const [name, setName] = useState({ value: '', error: '' })
  const [usd, setUsd] = useState({ value: '', error: '' })
  const [iq, setIq] = useState({ value: '', error: '' })

  const displayAddModal = (show) => {
    setAddModalVisible({ ...isAddModalVisible, value: show })
  }

  const onAddPressed = () => {
    const nameError = nameValidator(name.value)
    const usdError = passwordValidator(usd.value)
    const iqError = emailValidator(iq.value)
    if (iqError || usdError || nameError) {
      setName({ ...name, error: nameError })
      setIq({ ...iq, error: iqError })
      setUsd({ ...usd, error: usdError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  // Part of Edit Modal
  const [isEditModalVisible, setEditModalVisible] = useState({ value: false, error: '' })
  
  const [usdEditValue, setUsdEditValue] = useState()
  const [iqEditValue, setIqEditValue] = useState()
  const [action, setAction] = useState({ value: '', error: '' })
  const [currency, setCurrency] = useState({ value: '', error: '' })
  const [amount, setAmount] = useState({ value: '', error: '' })

  const displayEditModal = (show, usd, iq) => {
    setUsdEditValue(usd);
    setIqEditValue(iq);

    setEditModalVisible({ ...isEditModalVisible, value: show })
  }

  const onEditPressed = () => {
    const nameError = nameValidator(name.value)
    const usdError = passwordValidator(usd.value)
    const iqError = emailValidator(iq.value)
    if (iqError || usdError || nameError) {
      setName({ ...name, error: nameError })
      setIq({ ...iq, error: iqError })
      setUsd({ ...usd, error: usdError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  const updateAction = ( action ) => {
    setAction({value: action});
  }

  const updateCurrency = ( currency ) => {
    setCurrency({value: currency});
  }

  return (
    
      <View style={styles.container}>

        <Modal
          animationType = {"slide"}
          transparent={false}
          visible={isAddModalVisible.value}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          <Background>
            <Header>Add Vender</Header>
            <TextInput
              label="Vender Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
            />
            <TextInput
              label="USD Balance"
              returnKeyType="next"
              value={usd.value}
              onChangeText={(text) => setUsd({ value: text, error: '' })}
              error={!!usd.error}
              errorText={usd.error}
            />
            <TextInput
              label="IQ Balance"
              returnKeyType="done"
              value={iq.value}
              onChangeText={(text) => setIq({ value: text, error: '' })}
              error={!!iq.error}
              errorText={iq.error}
            />
            <Button
              mode="contained"
              onPress={onAddPressed}
              style={{ marginTop: 24 }}
            >
              Add
            </Button>
            <View style={styles.row}>
              <Text style={styles.closeText}
                onPress={() => {
                displayAddModal(!isAddModalVisible.value);}
                }> Back
              </Text>
            </View>
          </Background>
        </Modal>

        <Modal
          animationType = {"slide"}
          transparent={false}
          visible={isEditModalVisible.value}
          onRequestClose={() => {
            Alert.alert('Modal has now been closed.');
          }}>
          <Background>
            <Header>Edit Vender</Header>

            <Text style={styles.editModalItem}> USD: {usdEditValue} </Text>

            <Text style={styles.editModalItem}> IQ: {iqEditValue} </Text>

            <Picker selectedValue={ action.value } onValueChange = { (itemValue) => updateAction(itemValue) } returnKeyType="next" style={styles.picker}>
               <Picker.Item label = "Payment" value = "payment" />
               <Picker.Item label = "Load" value = "load" />
            </Picker>

            <Picker selectedValue={ currency.value } onValueChange = { updateCurrency } returnKeyType="next" style={styles.picker}>
               <Picker.Item label = "USD" value = "usd" />
               <Picker.Item label = "IQ" value = "iq" />
            </Picker>
            
            <TextInput
              label="Amount"
              returnKeyType="next"
              value={amount.value}
              onChangeText={(text) => setAmount({ value: text, error: '' })}
              error={!!amount.error}
              errorText={amount.error}
            />

            <Button
              mode="contained"
              onPress={onEditPressed}
              style={{ marginTop: 24 }}
            >
              Edit
            </Button>
            <View style={styles.row}>
              <Text style={styles.closeText}
                onPress={() => {
                  displayEditModal(!isEditModalVisible.value, null, null);}
                }> Back
              </Text>
            </View>
          </Background>
        </Modal>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <InvoiceButton
                mode="contained"
                onPress={toggle}
                style={ styles.invoice }
              >Invoice</InvoiceButton>
          <AddVenderButton
              mode="contained"
              style={styles.add}
              onPress={() => {
                displayAddModal(true);
              }}
            >
              Add Vender
          </AddVenderButton>  
        </View>
        
        <Table borderStyle={{ borderWidth: 2, borderColor: 'white' }}>
          <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
          <ScrollView style={styles.sroll}>
            <Rows data={data.tableData} textStyle={styles.text} onPress={() => displayEditModal(true)} />
          </ScrollView>
          <Row data={data.tableFooter} style={styles.footer} textStyle={styles.headText} />
        </Table>
      </View>
  )
}


const styles = StyleSheet.create({
  invoice: { width: '25%', alignSelf: 'flex-start', marginLeft: 3 },
  add: { width: '25%', alignSelf: 'flex-end', marginRight: 3},
  head: { height: 44, backgroundColor: 'darkblue' },
  footer: { height: 44, backgroundColor: '#003' },
  headText: { fontSize: 16, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 13, textAlign: 'center' },
  editModalItem : {marginTop: 12, marginBottom: 12, marginLeft: 5, fontSize: 15, alignSelf: 'flex-start'},
  scene: {
    flex: 1,
  },

  container: {
    marginTop: StatusBar.currentHeight,
  },

  picker: {
    width: '100%',
    alignItems: 'center'
  },
   
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  // text: {
  //   fontSize: 24,
  //   marginBottom: 30,
  //   padding: 40,
  // }
});