import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserError } from '../../services/selectors';
import { registerUser } from '../../services/slices/user-slice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorText = useSelector(selectUserError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = (e: SyntheticEvent) => {
  e.preventDefault();

  dispatch(
    registerUser({
      name: userName,
      email,
      password
    })
  )
    .unwrap()
    .then(() => {
      navigate('/', { replace: true });
    })
    .catch((err) => {
      console.error('Ошибка регистрации:', err);
    });
};
  return (
    <RegisterUI
      errorText={errorText || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
