import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '@/ui/Base/Button';

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  deleteHandler: () => void;
}

const Modal = ({ title, isOpen, setIsOpen, deleteHandler }: ModalProps) => {
  const closeButtonHandler = () => {
    setIsOpen(false);
  };

  const deleteButtonHandler = () => {
    setIsOpen(false);
    deleteHandler();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeButtonHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-900 bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-[313px] transform flex-col gap-[25px] overflow-hidden rounded-[4px] bg-white px-[25px] py-[20px] transition-all">
                  <Dialog.Title as="div" className="text-lg font-bold">
                    {title}을 정말 삭제할까요?
                    <p className="text-xs font-normal text-black-500">
                      한번 삭제하면 되돌릴 수 없어요.
                    </p>
                  </Dialog.Title>
                  <div className="flex justify-end gap-[10px]">
                    <Button
                      onClick={closeButtonHandler}
                      fill={false}
                      colorScheme="grey"
                      size="small"
                    >
                      취소
                    </Button>
                    <Button onClick={deleteButtonHandler} size="small">
                      삭제
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
