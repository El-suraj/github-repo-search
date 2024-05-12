import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Text,
  ModalFooter,
} from '@chakra-ui/react';

function DeleteRepoModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete repository</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want delete {isOpen.name} ?</Text>
          <Text fontSize="sm">This action cannot be undone</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            cancel
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default DeleteRepoModal;
