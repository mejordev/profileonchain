import React, { useState } from 'react';
import { UserStore, useUser, useUserActions } from '@/store/user.store';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import InputField from './input-field';
import TextareaField from './textarea-field';
import { Button } from '@/components/ui/button';
import { generateWallets } from '@/utils/wallets';
import { useWalletsActions } from '@/store/wallets.store';
import { handleApiCall, mockData } from '@/api/api';

interface ValidationMessages {
  name: string;
  description: string;
  avatarUrl: string;
  website: string;
}

const validateName = (name: string): string => {
  if (name.length === 0) {
    return 'Name cannot be empty.';
  }
  if (name.length > 32 || !/^[a-zA-Z0-9]*$/.test(name)) {
    return 'Name must be less than 32 characters and contain no special characters or spaces.';
  }
  return '';
};

const validateDescription = (description: string): string => {
  if (description.length >= 280) {
    return 'Description must be less than 280 characters.';
  }
  return '';
};

const validateUrl = (url: string, maxLength: number): string => {
  const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
  if (url.length > maxLength || !urlPattern.test(url)) {
    return `URL must be valid and less than ${maxLength} characters.`;
  }
  return '';
};

const ProfileCard: React.FC = () => {
  const {
    name = '',
    description = '',
    avatarUrl = '',
    website = '',
  } = useUser();
  const { updateField, setAddresses } = useUserActions();
  const { setWalletsLog, setEthereumPrivKey } = useWalletsActions();

  const [validationMessages, setValidationMessages] =
    useState<ValidationMessages>({
      name: '',
      description: '',
      avatarUrl: '',
      website: '',
    });

  const handleChange =
    (field: keyof UserStore) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(field, event.target.value);
      setValidationMessages(prev => ({
        ...prev,
        [field]: '',
      }));
    };

  const handleSubmit = async (path: string) => {
    const nameError = validateName(name);
    const descriptionError = validateDescription(description);
    const avatarUrlError = validateUrl(avatarUrl, 300);
    const websiteError = validateUrl(website, 280);

    setValidationMessages({
      name: nameError,
      description: descriptionError,
      avatarUrl: avatarUrlError,
      website: websiteError,
    });

    if (nameError || descriptionError || avatarUrlError || websiteError) {
      return;
    }
    console.log(name, description, avatarUrl, website);
    const { log, wallets, privateKey } = await generateWallets();
    await handleApiCall('/create');
    setAddresses(wallets);
    setEthereumPrivKey(privateKey);
    setWalletsLog(log);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a profile</CardTitle>
        <CardDescription>
          The directory within your project, in which your plugins are located.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <InputField
            id="name"
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange('name')}
          />
          {validationMessages.name && (
            <div className="text-red-500 text-sm">
              {validationMessages.name}
            </div>
          )}
          <TextareaField
            id="description"
            label="Description"
            placeholder="Enter your description"
            value={description}
            onChange={handleChange('description')}
          />
          {validationMessages.description && (
            <div className="text-red-500 text-sm">
              {validationMessages.description}
            </div>
          )}
          <InputField
            id="avatarUrl"
            label="Avatar URL"
            placeholder="Enter your avatar URL"
            value={avatarUrl}
            onChange={handleChange('avatarUrl')}
          />
          {validationMessages.avatarUrl && (
            <div className="text-red-500 text-sm">
              {validationMessages.avatarUrl}
            </div>
          )}
          <InputField
            id="website"
            label="Website"
            placeholder="Enter your website"
            value={website}
            onChange={handleChange('website')}
          />
          {validationMessages.website && (
            <div className="text-red-500 text-sm">
              {validationMessages.website}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button className="w-full" onClick={() => handleSubmit('/create')}>
          Generate wallets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
