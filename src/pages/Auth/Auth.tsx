import type { NavigateFunction } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/utils/context/Auth/useAuthContext';

const schema = z.object({
  username: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }).email(),
  password: z.string().min(3)
});

const onSubmit = async (
  data: z.infer<typeof schema>,
  navigate: NavigateFunction,
  handleSetError: () => void,
  setUser: ({ email }: { email: string }) => void
) => {
  const res = await fetch('http://localhost:31299/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.username,
      password: data.password
    })
  });
  const result = await res.json();
  if (result.error && !result.success) {
    console.log('errore321');
    handleSetError();
  }
  if (result.success) {
    setUser({ email: data.username });
    navigate('/');
    console.log('toast start');
    toast('succes login', { description: JSON.stringify(data), action: {
      label: 'Undo',
      onClick: () => console.log('Undo')
    }, style: {
      border: '2px solid green'
    } });
    console.log('toast end');
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  console.log(user);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: {
    password: '',
    username: ''
  } });
  const handleSetError = () => {
    form.setError('password', { message: 'password or email incorect' });
  };
  return (
    <div className='max-w-[960px] mx-auto px-3 grow flex flex-col justify-center'>
      <Form {...form}>
        <form
          className='flex flex-col items-center w-[300px]'
          onSubmit={form.handleSubmit(
            (data) => {
              onSubmit(data, navigate, handleSetError, setUser);
            },
            (error) => {
              console.log(error, 'errorvalid');
            }
          )}
        >
          <FormField
            render={({ field }) => (
              <FormItem className='mb-2 w-full'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            name='username'
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            name='password'
            control={form.control}
          />
          <Button className='mt-6 w-full' type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default Auth;
