import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, delivery } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova Encomenda',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        district: recipient.district,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
        date: format(parseISO(delivery.createdAt), "dd 'de' MMMM 'as' HH:mm", {
          locale: ptBR,
        }),
      },
    });
  }
}

export default new DeliveryMail();
