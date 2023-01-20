import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import styles from '../styles/CardFooter.module.css';

export default function CardFooter() {
  return (
    <div className={styles.cardFooter}>
      <Avatar icon={<UserOutlined />} />
      <div style={{
          display: 'flex', 
          alignItems: 'center',
        }}>
        <span style={{marginRight: 5 }}>3</span>
        <CommentOutlined style={{ fontSize: 24, opacity: 0.5 }} />
      </div>
    </div>
  )
}