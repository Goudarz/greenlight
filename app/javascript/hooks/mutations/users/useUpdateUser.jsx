import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function useUpdateUser(userId) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => axios.patch(`/api/v1/users/${userId}.json`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('useSessions');
        toast.success('User updated');
      },
      onError: () => {
        toast.error('There was a problem completing that action. \n Please try again.');
      },
    },
  );
  const onSubmit = (userData) => mutation.mutateAsync({ user: userData }).catch(/* Prevents the promise exception from bubbling */() => {});
  return { onSubmit, ...mutation };
}
