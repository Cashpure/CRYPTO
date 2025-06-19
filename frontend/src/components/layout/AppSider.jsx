import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
   padding: '1rem'
};

const data = [
   'Racing car sprays burning fuel into crowd.',
   'Japanese princess to wed commoner.',
   'Australian walks 100km after outback crash.',
   'Man charged over missing wedding girl.',
   'Los Angeles battles huge wildfires.',
];

export default function AppSider() {
   const {assets} = useContext(CryptoContext)
   
   return (
      <Layout.Sider width="25%" style={siderStyle}>
         {assets.map(asset => (
            <Card key={asset.id} style={{ marginBottom: '1rem' }}>
               <Statistic
                  title={asset.id.toUpperCase()}
                  value={asset.totalAmount}
                  precision={2}
                  valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                  prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="$"
               />
               <List
                  size='small'
                  dataSource={[
                     { title: 'Total profit', value: asset.totalProfit, withTag: true },
                     { title: 'Asset amount', value: asset.amount, isPlain: true },
                     // { title: 'Difference', value: asset.growPercent }
                  ]}
                  renderItem={item => (
                     <List.Item>
                        <span>{item.title}</span>

                        <span>
                           {item.withTag && (
                              <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                           )}
                           {item.isPlain && <span>{item.value}</span>}
                           {!item.isPlain && (
                              <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value}$</Typography.Text>
                           )}
                        </span>
                     </List.Item>
                  )}
               />
            </Card>
         ))}

         {/* <Card>
            <Statistic
               title="Idle"
               value={9.3}
               precision={2}
               valueStyle={{ color: '#cf1322' }}
               prefix={<ArrowDownOutlined />}
               suffix="%"
            />
         </Card> */}

      </Layout.Sider>
   )
}