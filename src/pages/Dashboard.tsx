import { Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Mon Espace Client" bordered={false}>
        <p>Bienvenue dans votre espace personnel.</p>
        <Button 
          type="primary" 
          onClick={() => navigate('/form')}
        >
          Demander un crédit
        </Button>
      </Card>
    </div>
  )
}