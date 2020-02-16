import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, delivery } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        date: format(
          parseISO(delivery.canceled_at),
          "dd 'de' MMMM 'as' HH:mm",
          {
            locale: ptBR,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
