import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, Modal, Text, ScrollView, Picker } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AddInvoiceButton from '../components/AddInvoiceButton';
import SendImageButton from '../components/SendImageButton';
import Background from '../components/Background';
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import InvoiceHeader from '../components/InvoiceHeader'
import Header from '../components/Header'
import BillButton from '../components/BillButton';

import DatePicker from 'react-native-datepicker';

const tableData = {
    tableHead: ['ID','Total', 'Quantity', 'Price', 'Item'],
    tableFooter: ['SUM','1000', '1000', '1000', ''],
    tableData: [
        ['1', '100', '2', '50', 'Cloth'],
        ['2', '100', '2', '50', 'Trousers'],
        ['3', '100', '2', '50', 'Cap'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
        ['4', '100', '2', '50', 'Spring'],
    ],
};


export default function InvoicesScreen({ toggle }) {

  const [data, setData] = useState(tableData);
  const [customer, setCustomer] = useState({ value: '', error: '' })
  const [date, setDate] = useState('2023-05-02');
 
  // Part of Add Modal  
  const [isAddModalVisible, setAddModalVisible] = useState({ value: false, error: '' })
  const [addCustomer, setAddCustomer] = useState({ value: '', error: '' })
  const [name, setName] = useState({ value: '', error: '' })
  const [price, setPrice] = useState({ value: '', error: '' })
  const [quantity, setQuantity] = useState({ value: '', error: '' })
  
  const displayAddModal = (show) => {
    setAddModalVisible({ ...isAddModalVisible, value: show })
  }

  const updateAddCustomer = ( customer ) => {
    setAddCustomer({value: customer});
  }

  const updateCustomer = ( customer ) => {
    setCustomer({value: customer});
  }

  const onAddPressed = () => {
    const nameError = nameValidator(name.value)
    const priceError = passwordValidator(price.value)
    const quantityError = emailValidator(quantity.value)
    if (quantityError || priceError || nameError) {
      setName({ ...name, error: nameError })
      setQuantity({ ...quantity, error: quantityError })
      setPrice({ ...price, error: priceError })
      return
    }
  }

  const sendImage = () => {

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
            <Header>Add Invoice</Header>
            <Picker selectedValue={ customer.value } onValueChange = { (itemValue) => updateAddCustomer(itemValue) } returnKeyType="next" style={styles.picker}>
               <Picker.Item label = "Payment" value = "payment" />
            </Picker>
            <TextInput
              label="Item Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
            />
            <TextInput
              label="Price"
              returnKeyType="next"
              value={price.value}
              onChangeText={(text) => setPrice({ value: text, error: '' })}
              error={!!price.error}
              errorText={price.error}
            />
            <TextInput
              label="Quantity"
              returnKeyType="done"
              value={quantity.value}
              onChangeText={(text) => setQuantity({ value: text, error: '' })}
              error={!!quantity.error}
              errorText={quantity.error}
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

        <InvoiceHeader>Invoices</InvoiceHeader>
        
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BillButton
                mode="contained"
                onPress={ toggle }
                style={ styles.bill }
              >Bill</BillButton>
          <SendImageButton
                mode="contained"
                onPress={ sendImage }
                style={ styles.sendImageButton }
              >Send Image</SendImageButton>
          <AddInvoiceButton
              mode="contained"
              style={styles.add}
              onPress={() => {
                displayAddModal(true);
              }}
            >
              Add Invoice
          </AddInvoiceButton>  
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Picker selectedValue={ customer.value } onValueChange = { (itemValue) => updateCustomer(itemValue) } returnKeyType="next" style={styles.picker}>
              <Picker.Item label = "Customer1" value = "customer1" />
          </Picker>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="YYYY-MM-DD"
            // minDate="01-01-2016"
            // maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                // marginLeft: 10,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>

        <Table borderStyle={{ borderWidth: 2, borderColor: 'white' }}>
          <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
          <ScrollView style={styles.scroll}>
            <Rows data={data.tableData} textStyle={styles.text}/>
          </ScrollView>
          <Row data={data.tableFooter} style={styles.footer} textStyle={styles.headText} />
        </Table>
      </View>
  )
}

const styles = StyleSheet.create({
  bill: { width: '20%', alignSelf: 'flex-start', marginLeft: 3 },
  sendImageButton: { width: '20%', alignSelf: 'flex-start' },
  add: { width: '25%', alignSelf: 'flex-end', marginRight: 3},
  scroll: { height: '100%' },
  head: { height: 44, backgroundColor: 'darkblue' },
  footer: { height: 44, backgroundColor: 'darkblue', position: 'absolute', bottom: 100 },
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
    width: '40%',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },

  datePickerStyle: {
    width: '40%',
    alignSelf: 'flex-end',
    marginRight: 3,
    marginBottom: 3,
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
  
});