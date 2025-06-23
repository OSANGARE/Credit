import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Modal } from 'antd';

// Schéma de validation Yup
const schema = yup.object({
  fullName: yup.string().required('Le nom complet est obligatoire'),
  email: yup.string().email('Email invalide').required('Email obligatoire'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Numéro invalide').required(),
  amount: yup.number()
    .min(1000, 'Minimum 1000€')
    .max(50000, 'Maximum 50000€')
    .required(),
  duration: yup.number().min(6, 'Minimum 6 mois').required(),
  birthDate: yup.date().required('Date de naissance obligatoire'),
});

type FormData = yup.InferType<typeof schema>;

export default function CreditForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      amount: 5000,
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Données validées:', data);
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 10000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Champ Nom Complet */}
        <Form.Item
          label="Nom complet"
          validateStatus={errors.fullName ? 'error' : ''}
          help={errors.fullName?.message}
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Jean Dupont" />}
          />
        </Form.Item>

        {/* Champ Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="jean@exemple.com" />
            )}
          />
        </Form.Item>

        {/* Champ Téléphone */}
        <Form.Item
          label="Téléphone"
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="0612345678" />
            )}
          />
        </Form.Item>

        {/* Champ Montant */}
        <Form.Item
          label="Montant (€)"
          validateStatus={errors.amount ? 'error' : ''}
          help={errors.amount?.message}
        >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: '100%' }} min={1000} max={50000} />
            )}
          />
        </Form.Item>

        {/* Champ Durée */}
        <Form.Item
          label="Durée (mois)"
          validateStatus={errors.duration ? 'error' : ''}
          help={errors.duration?.message}
        >
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select {...field} options={[
                { value: 6, label: '6 mois' },
                { value: 12, label: '1 an' },
                { value: 24, label: '2 ans' },
              ]} />
            )}
          />
        </Form.Item>

        {/* Champ Date de Naissance */}
        <Form.Item
          label="Date de naissance"
          validateStatus={errors.birthDate ? 'error' : ''}
          help={errors.birthDate?.message}
        >
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker {...field} style={{ width: '100%' }} />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Soumettre la demande
        </Button>
      </form>

      <Modal
        title="Demande envoyée !"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>Votre demande de crédit a été reçue. Un conseiller vous contactera sous 48h.</p>
      </Modal>
    </div>
  );
}