import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

interface Props {
  onAdd: (newMovie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

type Validation = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie: React.FC<Props> = props => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleBody, setTitleBody] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(true);
  const [onDisabledSubmit, setOnDisabledSubmit] = useState(true);

  const validateForm = () => {
    let isValid = true;

    if (titleBody.trim() === '') {
      isValid = false;
    }

    if (imgUrl.trim() === '') {
      isValid = false;
    }

    if (imdbUrl.trim() === '') {
      isValid = false;
    }

    if (imdbId.trim() === '') {
      isValid = false;
    }

    setOnDisabledSubmit(!isValid);
  };

  const handleInputTitle = (newValue: string) => {
    setTitleBody(newValue);
    validateForm();
  };

  const handleInputDesc = (newValue: string) => {
    setDescription(newValue);
  };

  const handleInputImgUrl = (newValue: string) => {
    setImgUrl(newValue);
    validateForm();
  };

  const handleInputImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
    validateForm();
  };

  const handleInputImdbId = (newValue: string) => {
    setImdbId(newValue);
    validateForm();
  };

  const validationField = (validation: Validation) => {
    if (
      validation.imdbUrl !== '' &&
      validation.title !== '' &&
      validation.imgUrl !== '' &&
      validation.imdbId !== ''
    ) {
      setTitleError(false);
      props.onAdd(validation);

      setTitleBody('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');

      setCount(count + 1);

      return;
    }

    setOnDisabledSubmit(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie = {
      title: titleBody,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    };

    validationField(newMovie);
  };

  return (
    <form
      action="../../api/movies.json"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleBody}
        onChange={handleInputTitle}
        required={titleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputDesc}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputImgUrl}
        required={titleError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputImdbUrl}
        required={titleError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputImdbId}
        required={titleError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={onDisabledSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
