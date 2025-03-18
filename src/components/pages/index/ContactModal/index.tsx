import { AnimatePresence } from 'framer-motion'

import Button from '@/components/common/Button'
import useContactModalStore from '@/stores/contact-modal'
import * as S from './styles'

export default function ContactModal() {
  const { isVisible, data, hide } = useContactModalStore()

  return (
    <AnimatePresence>
      {isVisible && (
        <S.Backdrop
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="modal-backdrop"
        >
          <S.ModalContent role="modal">
            <S.ModalTitle data-testid="modal-title">
              Dados de contato do vendedor
            </S.ModalTitle>

            {!!data && (
              <>
                <S.ModalSubtitle data-testid="modal-subtitle">
                  {data.car.brand} {data.car.model}
                </S.ModalSubtitle>
                <S.ContactData data-testid="modal-contact-data">
                  <dt>Nome</dt>
                  <dd>{data.author.name}</dd>
                  <dt>Telefone</dt>
                  <dd>{data.author.phone}</dd>
                  <dt>E-mail</dt>
                  <dd>{data.author.email}</dd>
                  <dt>Localização</dt>
                  <dd>
                    {data.author.city}, {data.author.state}
                  </dd>
                </S.ContactData>
              </>
            )}

            <Button onClick={hide}>fechar</Button>
          </S.ModalContent>
        </S.Backdrop>
      )}
    </AnimatePresence>
  )
}
