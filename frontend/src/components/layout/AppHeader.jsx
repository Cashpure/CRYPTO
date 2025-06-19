import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from './CoinInfoModal';
import AddAssetForm from './AddAssetForm';

const headerStyle = {
   textAlign: 'center',
   height: 60,
   display: 'flex',
   padding: '1rem',
   justifyContent: 'space-between',
   alignItems: 'center',
   // background: 'white'
};

export default function AppHeader() {
   const [select, setSelect] = useState(false)
   const [modal, setModal] = useState(false)
   const [coin, setCoin] = useState(null)
   const [drawer, setDrawer] = useState(false)
   useEffect(() => {
      const keypress = event => {
         if (event.key === '/') {
            setSelect((prev) => !prev)
         }
      }
      document.addEventListener('keypress', keypress)
      return () => document.removeEventListener('keypress', keypress)
   }, [])
   const { crypto } = useCrypto()

   const handleSelect = (value) => {
      setModal(true)
      setCoin(crypto.find((c) => c.id === value))
   }

   const handleCancel = () => {
      setModal(false);
   };

   return (
      <Layout.Header style={headerStyle}>
         <Select
            style={{ width: 250 }}
            placeholder="select one country"
            defaultValue={['china']}
            onSelect={handleSelect}
            onClick={() => setSelect((prev) => !prev)}
            open={select}
            options={crypto.map(coin => ({
               label: coin.name,
               value: coin.id,
               icon: coin.icon,
            }))}
            value="press / to open"
            optionRender={(option) => (
               <Space>
                  <img style={{ width: 25 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
               </Space>
            )}

         >

         </Select>
         <Button onClick={() => setDrawer(true)} type="primary">Add Asset</Button>
         <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={modal}
            onCancel={handleCancel}
            footer={null}
         >
            <CoinInfoModal coin={coin} />
         </Modal>
         <Drawer
            width={600}
            title="Add Asset"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => setDrawer(false)}
            open={drawer}
            destroyOnHidden={true}
         >
            <AddAssetForm onClose={() => setDrawer(false)}/>
         </Drawer>
      </Layout.Header>

   )
}