import { Space, Card, Layout, ConfigProvider, Typography, theme, Divider, Button } from 'antd';
import { DownloadOutlined, FilterOutlined, FormOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'
import CardFooter from '../components/CardFooter';

const { Title } = Typography;
const { Content, Header } = Layout;

export default function Home() {
  const [data, setData] = useState([]);
  // would normally be an array of filters instead of a single number
  const [filterCount, setFilterCount] = useState(11);

  const BarChart = dynamic(() => import('../components/BarChart'), { ssr: false });
  const RadialChart = dynamic(() => import('../components/RadialChart'), { ssr: false });

  const endpoint = (
    'https://api.coronavirus.data.gov.uk/v1/data?' +
    'filters=areaType=overview&' +
    'structure={"date":"date","dailyCases":"newCasesByPublishDate","cumulativeCases":"cumCasesByPublishDate"}'
  );

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setData(data.data.slice(0, 10)));
  }, []);

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  return (
    <ConfigProvider componentSize='large'>
      <Layout className={styles.layout}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center',
          }}>
          <div className={styles.header} >
            <Title level={2}>Demo</Title>
          </div>
        </Header>
        <Content className={styles.main}>
          <Space size="middle" align='center' className={styles.pageTitle}>
            <Title>Page title</Title>
            <Space className={styles.actionButtons}>
              <Button>Export to PDF <DownloadOutlined style={{color: colorPrimary}} /></Button>
              <Button>Notes <span className={styles.pale}>(3)</span> <FormOutlined style={{color: colorPrimary}} /></Button>
              <Button>Filter <span className={styles.fullCircle}>{filterCount < 10 ? filterCount : '9+'}</span> <FilterOutlined style={{color: colorPrimary}} /></Button>
            </Space>
          </Space>
          <div className={styles.charts}>
            <Card className={styles.card} title="Daily Cases">
              <div>
                <BarChart data={data} />
              </div>
              <Divider/>
              <CardFooter/>
            </Card>
            <Card className={styles.card} title="Cumulative Cases">
              <div>
                <RadialChart data={data} />
              </div>
              <Divider/>
              <CardFooter/>
            </Card>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
