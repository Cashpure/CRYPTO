import { Select, Space, Typography, Flex, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd"
import { useState, useRef } from "react"
import { useCrypto } from "../../context/crypto-context"
import CoinInfo from "./CoinInfo"

export default function AddAssetForm() {
   const { crypto, addAsset } = useCrypto()
   const [coin, setCoin] = useState(null)
   const [form] = Form.useForm()
   const [submitted, setSubmitted] = useState(false)
   const assetRef = useRef()

   if (submitted) {
      return (
         <Result
            status="success"
            title="New Asset Added"
            subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
               <Button type="primary" key="console" onClick={submitted}>
                  Go Console
               </Button>
            ]}
         />
      )
   }

   const validateMessages = {
      required: "${label} is require!",
      types: {
         number: '${label} is not valid number'
      },
      number: {
         range: '${label} must be between ${min} and ${max}'
      }
   }

   if (!coin) {
      return (

         <Select
            style={{ width: '100%' }}
            placeholder="select coin"
            onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
            options={crypto.map(coin => ({
               label: coin.name,
               value: coin.id,
               icon: coin.icon,
            }))}
            optionRender={(option) => (
               <Space>
                  <img style={{ width: 25 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
               </Space>
            )}

         >

         </Select>
      )
   }

   const onFinish = (values) => {
      const newAsset = {
         id: coin.id, 
         amount: values.amount,
         price: values.price,
         date: values.date?.$d ?? new Date()
      }
      assetRef.current = newAsset
      setSubmitted(true)
      addAsset(newAsset)
   }

   const handleAmountChange = (value) => {
      const price = form.getFieldValue('price')
      form.setFieldsValue({
         total: +(value * price).toFixed(2)
      })
   }
   const handlePriceChange = (value) => {
      const amount = form.getFieldValue('amount')
      form.setFieldsValue({
         total: +(amount * value).toFixed(2)
      })
   }

   return (
      <Form
         form={form}
         name="basic"
         labelCol={{ span: 4 }}
         wrapperCol={{ span: 10 }}
         style={{ maxWidth: '100%' }}
         initialValues={{ price: +coin.price.toFixed(4) }}
         onFinish={onFinish}
         validateMessages={validateMessages}
      >
         <CoinInfo coin={coin} />
         <Divider />

         <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, type: 'number', min: 0 }]}
         >
            <InputNumber placeholder="Enter coin amount" style={{ width: '100%' }} onChange={handleAmountChange} />
         </Form.Item>

         <Form.Item
            label="Price" name="price"
         >
            <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
         </Form.Item>

         <Form.Item
            label="Date & Time" name="date"
         >
            <DatePicker showTime />
         </Form.Item>

         <Form.Item
            label="Toatal" name="total"
         >
            <InputNumber disabled style={{ width: '100%' }} />
         </Form.Item>

         <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
               Add Asset
            </Button>
         </Form.Item>
      </Form>
   )


}