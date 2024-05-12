import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFocusScope,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

function CreateRepoModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onCreate({ name, description }); //pass new repo data to parent
    onClose();
    setName('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New repository</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              value={name}
              onChange={handleNameChange}
              id="name"
              placeholder="Enter repository name"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              value={description}
              onChange={handleDescriptionChange}
              id="description"
              placeholder="enter description (optional)"
            />
          </FormControl>
          <Button type="submit" onClick={handleSubmit}>
            Create Repository
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateRepoModal;
